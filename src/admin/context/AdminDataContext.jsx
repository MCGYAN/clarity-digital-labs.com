import { createContext, useContext, useMemo, useState } from 'react'
import {
  initialBookings,
  initialContacts,
  initialLandingPages,
  initialProducts,
  initialSales,
} from '../data/mock'

const AdminDataContext = createContext(null)

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

export function AdminDataProvider({ children }) {
  const [contacts, setContacts] = useState(initialContacts)
  const [bookings, setBookings] = useState(initialBookings)
  const [landingPages, setLandingPages] = useState(initialLandingPages)
  const [products, setProducts] = useState(initialProducts)
  const [sales] = useState(initialSales)

  const value = useMemo(
    () => ({
      contacts,
      bookings,
      landingPages,
      products,
      sales,
      addContact(contact) {
        const next = {
          ...contact,
          id: uid('c'),
          createdAt: new Date().toISOString().slice(0, 10),
          activities: [{ id: uid('a'), type: 'Note', label: 'Contact created', at: new Date().toLocaleString() }],
        }
        setContacts((prev) => [next, ...prev])
        return next
      },
      updateContact(id, patch) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
      },
      deleteContact(id) {
        setContacts((prev) => prev.filter((c) => c.id !== id))
      },
      addBooking(booking) {
        const next = { ...booking, id: uid('b') }
        setBookings((prev) => [next, ...prev])
        return next
      },
      updateBooking(id, patch) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)))
      },
      addLandingPage(page) {
        const next = {
          ...page,
          id: uid('lp'),
          visitors: 0,
          leads: 0,
          createdAt: new Date().toISOString().slice(0, 10),
        }
        setLandingPages((prev) => [next, ...prev])
        return next
      },
      updateLandingPage(id, patch) {
        setLandingPages((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
      },
      duplicateLandingPage(id) {
        setLandingPages((prev) => {
          const source = prev.find((p) => p.id === id)
          if (!source) return prev
          return [
            {
              ...source,
              id: uid('lp'),
              name: `${source.name} (Copy)`,
              slug: `${source.slug}-copy`,
              status: 'Draft',
              visitors: 0,
              leads: 0,
              createdAt: new Date().toISOString().slice(0, 10),
            },
            ...prev,
          ]
        })
      },
      addProduct(product) {
        const next = { ...product, id: uid('p'), sales: 0 }
        setProducts((prev) => [next, ...prev])
        return next
      },
      updateProduct(id, patch) {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
      },
    }),
    [contacts, bookings, landingPages, products, sales],
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('useAdminData must be used inside AdminDataProvider')
  return ctx
}
