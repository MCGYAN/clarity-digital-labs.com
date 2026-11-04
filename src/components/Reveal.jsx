import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  ...props
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const delayClass =
    delay === 1
      ? 'reveal-delay-1'
      : delay === 2
        ? 'reveal-delay-2'
        : delay === 3
          ? 'reveal-delay-3'
          : delay === 4
            ? 'reveal-delay-4'
            : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${delayClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  )
}
