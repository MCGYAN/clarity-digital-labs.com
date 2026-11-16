import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Badge,
  EmptyState,
  Field,
  Modal,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  Select,
  TextArea,
  TextInput,
  statusTone,
} from '../components/ui'
import DataState from '../components/DataState'
import { useAdminData } from '../context/AdminDataContext'
import { formatGhs } from '../data/constants'

const emptyProduct = {
  name: '',
  description: '',
  priceGhs: '',
  paymentLink: '',
  status: 'Draft',
}

export default function Products() {
  const { products, addProduct, updateProduct, loading, error } = useAdminData()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  function openCreate() {
    setEditingId(null)
    setForm(emptyProduct)
    setFormError('')
    setOpen(true)
  }

  function openEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name || '',
      description: product.description || '',
      priceGhs: String(product.priceGhs ?? ''),
      paymentLink: product.paymentLink || '',
      status: product.status || 'Draft',
    })
    setFormError('')
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
    setEditingId(null)
    setForm(emptyProduct)
    setFormError('')
  }

  async function saveProduct(e) {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        description: form.description,
        priceGhs: Number(form.priceGhs || 0),
        paymentLink: form.paymentLink,
        status: form.status,
      }
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await addProduct({ ...payload, image: '' })
      }
      closeModal()
    } catch (err) {
      setFormError(err.message || 'Could not save product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Products"
        description="Digital products priced in Ghana cedis (GHS)."
        actions={
          <PrimaryButton onClick={openCreate}>
            <span className="inline-flex items-center gap-2">
              <Plus size={16} /> Add product
            </span>
          </PrimaryButton>
        }
      />

      <DataState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && products.length === 0}
        empty={
          <EmptyState
            title="No products yet"
            description="Add your first digital product."
            action={<PrimaryButton onClick={openCreate}>Add product</PrimaryButton>}
          />
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Panel key={product.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-deep">{product.name}</h2>
                <Badge tone={statusTone(product.status)}>{product.status}</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
              <p className="mt-4 font-display text-xl font-bold text-deep">{formatGhs(product.priceGhs)}</p>
              <p className="mt-1 text-xs text-muted">{product.sales} sales</p>
              <p className="mt-3 truncate text-xs text-muted">{product.paymentLink || 'No payment link yet'}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <SecondaryButton onClick={() => openEdit(product)}>Edit</SecondaryButton>
                <SecondaryButton
                  onClick={() =>
                    updateProduct(product.id, {
                      status: product.status === 'Published' ? 'Draft' : 'Published',
                    })
                  }
                >
                  {product.status === 'Published' ? 'Unpublish' : 'Publish'}
                </SecondaryButton>
              </div>
            </Panel>
          ))}
        </div>
      </DataState>

      <Modal
        open={open}
        onClose={closeModal}
        title={editingId ? 'Edit digital product' : 'Add digital product'}
        wide
      >
        <form className="grid gap-3" onSubmit={saveProduct}>
          <Field label="Product name">
            <TextInput required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Description">
            <TextArea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Price (GHS)">
            <TextInput
              required
              type="number"
              min="0"
              value={form.priceGhs}
              onChange={(e) => setForm({ ...form, priceGhs: e.target.value })}
            />
          </Field>
          <Field label="Payment link">
            <TextInput
              value={form.paymentLink}
              onChange={(e) => setForm({ ...form, paymentLink: e.target.value })}
              placeholder="https://..."
            />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Draft</option>
              <option>Published</option>
            </Select>
          </Field>
          {formError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>}
          <div className="flex justify-end gap-2">
            <SecondaryButton type="button" onClick={closeModal}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Save product'}
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}
