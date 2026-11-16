import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Badge,
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
import { useAdminData } from '../context/AdminDataContext'
import { formatGhs } from '../data/mock'

const emptyProduct = {
  name: '',
  description: '',
  priceGhs: '',
  paymentLink: '',
  status: 'Draft',
}

export default function Products() {
  const { products, addProduct, updateProduct } = useAdminData()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyProduct)

  function saveProduct(e) {
    e.preventDefault()
    addProduct({
      ...form,
      priceGhs: Number(form.priceGhs || 0),
      image: '',
    })
    setForm(emptyProduct)
    setOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Products"
        description="Digital products priced in Ghana cedis (GHS)."
        actions={
          <PrimaryButton onClick={() => setOpen(true)}>
            <span className="inline-flex items-center gap-2">
              <Plus size={16} /> Add product
            </span>
          </PrimaryButton>
        }
      />

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
            <SecondaryButton
              className="mt-4"
              onClick={() =>
                updateProduct(product.id, {
                  status: product.status === 'Published' ? 'Draft' : 'Published',
                })
              }
            >
              {product.status === 'Published' ? 'Unpublish' : 'Publish'}
            </SecondaryButton>
          </Panel>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add digital product" wide>
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
            <TextInput value={form.paymentLink} onChange={(e) => setForm({ ...form, paymentLink: e.target.value })} />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Draft</option>
              <option>Published</option>
            </Select>
          </Field>
          <p className="text-sm text-muted">Image upload will connect when storage is added.</p>
          <div className="flex justify-end gap-2">
            <SecondaryButton type="button" onClick={() => setOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">Save product</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}
