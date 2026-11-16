const MOOLRE_SCRIPT = 'https://js.moolre.com/moolre-min.js'

export const moolreConfig = {
  username: (import.meta.env.VITE_MOOLRE_USERNAME || '').trim(),
  publicKey: (import.meta.env.VITE_MOOLRE_PUBLIC_KEY || '').trim(),
  accountNumber: (import.meta.env.VITE_MOOLRE_ACCOUNT_NUMBER || '').trim(),
}

export function isMoolreConfigured() {
  return Boolean(moolreConfig.username && moolreConfig.publicKey && moolreConfig.accountNumber)
}

let scriptPromise = null

function loadMoolreScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Checkout only works in the browser.'))
  }
  if (window.MoolrePay) return Promise.resolve(window.MoolrePay)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${MOOLRE_SCRIPT}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.MoolrePay))
      existing.addEventListener('error', () => reject(new Error('Could not load Moolre checkout.')))
      if (window.MoolrePay) resolve(window.MoolrePay)
      return
    }

    const script = document.createElement('script')
    script.src = MOOLRE_SCRIPT
    script.async = true
    script.onload = () => {
      if (!window.MoolrePay) {
        reject(new Error('Moolre checkout failed to start.'))
        return
      }
      resolve(window.MoolrePay)
    }
    script.onerror = () => reject(new Error('Could not load Moolre checkout.'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

function makeExternalRef(prefix = 'cdl') {
  const rand = Math.random().toString(36).slice(2, 8)
  return `${prefix}_${Date.now()}_${rand}`
}

/**
 * Opens Moolre inline checkout for a GHS amount.
 * Throws a clear error if keys are missing.
 */
export async function startMoolreCheckout({
  amount,
  email,
  customerName = '',
  phone = '',
  metadata = {},
  onSuccess,
  onCancel,
  onError,
}) {
  if (!isMoolreConfigured()) {
    const err = new Error('Payment system not installed yet.')
    err.code = 'MOOLRE_NOT_CONFIGURED'
    throw err
  }

  const price = Number(amount)
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error('This product does not have a valid price yet.')
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Enter a valid email to continue.')
  }

  const MoolrePay = await loadMoolreScript()
  const popup = new MoolrePay()
  const externalRef = makeExternalRef('product')

  popup.checkout({
    username: moolreConfig.username,
    publicKey: moolreConfig.publicKey,
    accountNumber: moolreConfig.accountNumber,
    amount: price,
    currency: 'GHS',
    email,
    customer: {
      name: customerName || undefined,
      phone_number: phone || undefined,
    },
    externalRef,
    metadata,
    onSuccess: (res) => onSuccess?.(res, externalRef),
    onCancel: () => onCancel?.(),
    onError: (err) => onError?.(err),
  })

  return externalRef
}
