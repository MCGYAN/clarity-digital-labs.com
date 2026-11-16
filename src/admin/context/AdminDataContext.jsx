import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import {
  mapBooking,
  mapContact,
  mapEmailCampaign,
  mapLandingPage,
  mapMetaAudience,
  mapProduct,
  mapSale,
  mapSmsCampaign,
} from '../lib/mappers'
import { monthKey, monthLabel } from '../data/constants'

const AdminDataContext = createContext(null)

export function AdminDataProvider({ children }) {
  const [contacts, setContacts] = useState([])
  const [bookings, setBookings] = useState([])
  const [landingPages, setLandingPages] = useState([])
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [emailCampaigns, setEmailCampaigns] = useState([])
  const [smsCampaigns, setSmsCampaigns] = useState([])
  const [metaAudiences, setMetaAudiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), [])

  useEffect(() => {
    let active = true

    async function load() {
      if (!supabase) {
        setError('Supabase is not configured.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      const [
        contactsRes,
        activitiesRes,
        bookingsRes,
        pagesRes,
        productsRes,
        salesRes,
        emailRes,
        smsRes,
        metaRes,
      ] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_activities').select('*').order('occurred_at', { ascending: false }),
        supabase.from('bookings').select('*').order('booking_date', { ascending: false }),
        supabase.from('landing_pages').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('sales').select('*').order('sale_date', { ascending: false }),
        supabase.from('email_campaigns').select('*').order('created_at', { ascending: false }),
        supabase.from('sms_campaigns').select('*').order('created_at', { ascending: false }),
        supabase.from('meta_audiences').select('*').order('created_at', { ascending: false }),
      ])

      if (!active) return

      const firstError = [
        contactsRes.error,
        activitiesRes.error,
        bookingsRes.error,
        pagesRes.error,
        productsRes.error,
        salesRes.error,
        emailRes.error,
        smsRes.error,
        metaRes.error,
      ].find(Boolean)

      if (firstError) {
        setError(firstError.message)
        setLoading(false)
        return
      }

      const activitiesByContact = (activitiesRes.data || []).reduce((acc, row) => {
        ;(acc[row.contact_id] ||= []).push(row)
        return acc
      }, {})

      setContacts((contactsRes.data || []).map((row) => mapContact(row, activitiesByContact[row.id] || [])))
      setBookings((bookingsRes.data || []).map(mapBooking))
      setLandingPages((pagesRes.data || []).map(mapLandingPage))
      setProducts((productsRes.data || []).map(mapProduct))
      setSales((salesRes.data || []).map(mapSale))
      setEmailCampaigns((emailRes.data || []).map(mapEmailCampaign))
      setSmsCampaigns((smsRes.data || []).map(mapSmsCampaign))
      setMetaAudiences((metaRes.data || []).map(mapMetaAudience))
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [refreshKey])

  const analytics = useMemo(() => {
    const months = new Map()

    for (const contact of contacts) {
      const key = monthKey(contact.createdAt)
      if (!key) continue
      const row = months.get(key) || { month: monthLabel(key), visitors: 0, leads: 0, revenue: 0 }
      row.leads += 1
      months.set(key, row)
    }

    for (const page of landingPages) {
      const key = monthKey(page.createdAt)
      if (!key) continue
      const row = months.get(key) || { month: monthLabel(key), visitors: 0, leads: 0, revenue: 0 }
      row.visitors += page.visitors || 0
      months.set(key, row)
    }

    for (const sale of sales) {
      if (sale.status !== 'Paid') continue
      const key = monthKey(sale.date)
      if (!key) continue
      const row = months.get(key) || { month: monthLabel(key), visitors: 0, leads: 0, revenue: 0 }
      row.revenue += sale.amountGhs || 0
      months.set(key, row)
    }

    const series = [...months.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => value)

    const sourceMap = contacts.reduce((acc, contact) => {
      const key = contact.source || 'Direct'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    const totalSources = Object.values(sourceMap).reduce((sum, n) => sum + n, 0) || 1
    const leadSources = Object.entries(sourceMap).map(([name, value]) => ({
      name,
      value: Math.round((value / totalSources) * 100),
      count: value,
    }))

    const recentActivity = [
      ...contacts.slice(0, 5).map((c) => ({
        id: `contact-${c.id}`,
        text: `New contact: ${c.fullName}`,
        time: c.createdAt,
      })),
      ...bookings.slice(0, 5).map((b) => ({
        id: `booking-${b.id}`,
        text: `Booking: ${b.contactName} · ${b.type}`,
        time: b.date,
      })),
      ...sales.slice(0, 5).map((s) => ({
        id: `sale-${s.id}`,
        text: `Sale: ${s.product} · GHS ${s.amountGhs}`,
        time: s.date,
      })),
    ]
      .sort((a, b) => String(b.time).localeCompare(String(a.time)))
      .slice(0, 8)

    return { series, leadSources, recentActivity }
  }, [contacts, landingPages, sales, bookings])

  const value = useMemo(
    () => ({
      contacts,
      bookings,
      landingPages,
      products,
      sales,
      emailCampaigns,
      smsCampaigns,
      metaAudiences,
      analytics,
      loading,
      error,
      refresh,
      async addContact(contact) {
        const { data, error: insertError } = await supabase
          .from('contacts')
          .insert({
            full_name: contact.fullName,
            email: contact.email,
            phone: contact.phone || '',
            company: contact.company || '',
            source: contact.source,
            service: contact.service,
            status: contact.status,
            tags: contact.tags || [],
            marketing_consent: Boolean(contact.marketingConsent),
            notes: contact.notes || '',
          })
          .select('*')
          .single()

        if (insertError) throw insertError

        await supabase.from('contact_activities').insert({
          contact_id: data.id,
          type: 'Note',
          label: 'Contact created',
        })

        refresh()
        return mapContact(data, [])
      },
      async updateContact(id, patch) {
        const payload = {}
        if (patch.fullName !== undefined) payload.full_name = patch.fullName
        if (patch.email !== undefined) payload.email = patch.email
        if (patch.phone !== undefined) payload.phone = patch.phone
        if (patch.company !== undefined) payload.company = patch.company
        if (patch.source !== undefined) payload.source = patch.source
        if (patch.service !== undefined) payload.service = patch.service
        if (patch.status !== undefined) payload.status = patch.status
        if (patch.tags !== undefined) payload.tags = patch.tags
        if (patch.marketingConsent !== undefined) payload.marketing_consent = patch.marketingConsent
        if (patch.notes !== undefined) payload.notes = patch.notes
        payload.updated_at = new Date().toISOString()

        const { error: updateError } = await supabase.from('contacts').update(payload).eq('id', id)
        if (updateError) throw updateError
        refresh()
      },
      async deleteContact(id) {
        const { error: deleteError } = await supabase.from('contacts').delete().eq('id', id)
        if (deleteError) throw deleteError
        refresh()
      },
      async addBooking(booking) {
        const { data, error: insertError } = await supabase
          .from('bookings')
          .insert({
            contact_name: booking.contactName,
            contact_email: booking.contactEmail || '',
            type: booking.type,
            booking_date: booking.date,
            booking_time: booking.time,
            status: booking.status,
            notes: booking.notes || '',
          })
          .select('*')
          .single()
        if (insertError) throw insertError
        refresh()
        return mapBooking(data)
      },
      async updateBooking(id, patch) {
        const payload = { updated_at: new Date().toISOString() }
        if (patch.status !== undefined) payload.status = patch.status
        if (patch.contactName !== undefined) payload.contact_name = patch.contactName
        if (patch.contactEmail !== undefined) payload.contact_email = patch.contactEmail
        if (patch.type !== undefined) payload.type = patch.type
        if (patch.date !== undefined) payload.booking_date = patch.date
        if (patch.time !== undefined) payload.booking_time = patch.time
        if (patch.notes !== undefined) payload.notes = patch.notes

        const { error: updateError } = await supabase.from('bookings').update(payload).eq('id', id)
        if (updateError) throw updateError
        refresh()
      },
      async addLandingPage(page) {
        const { data, error: insertError } = await supabase
          .from('landing_pages')
          .insert({
            name: page.name,
            slug: page.slug,
            campaign: page.campaign || '',
            status: page.status || 'Draft',
            visitors: 0,
            leads: 0,
            template_key: page.templateKey || 'lead_magnet',
            content: page.content || {},
            cta_type: page.ctaType || 'lead_form',
            cta_label: page.ctaLabel || 'Get started',
            cta_url: page.ctaUrl || '',
            has_vsl: Boolean(page.hasVsl),
            vsl_url: page.vslUrl || '',
            lead_magnet_url: page.leadMagnetUrl || '',
            form_fields: page.formFields || ['fullName', 'email', 'phone'],
          })
          .select('*')
          .single()
        if (insertError) throw insertError
        refresh()
        return mapLandingPage(data)
      },
      async updateLandingPage(id, patch) {
        const payload = { updated_at: new Date().toISOString() }
        if (patch.name !== undefined) payload.name = patch.name
        if (patch.slug !== undefined) payload.slug = patch.slug
        if (patch.campaign !== undefined) payload.campaign = patch.campaign
        if (patch.status !== undefined) payload.status = patch.status
        if (patch.visitors !== undefined) payload.visitors = patch.visitors
        if (patch.leads !== undefined) payload.leads = patch.leads
        if (patch.templateKey !== undefined) payload.template_key = patch.templateKey
        if (patch.content !== undefined) payload.content = patch.content
        if (patch.ctaType !== undefined) payload.cta_type = patch.ctaType
        if (patch.ctaLabel !== undefined) payload.cta_label = patch.ctaLabel
        if (patch.ctaUrl !== undefined) payload.cta_url = patch.ctaUrl
        if (patch.hasVsl !== undefined) payload.has_vsl = patch.hasVsl
        if (patch.vslUrl !== undefined) payload.vsl_url = patch.vslUrl
        if (patch.leadMagnetUrl !== undefined) payload.lead_magnet_url = patch.leadMagnetUrl
        if (patch.formFields !== undefined) payload.form_fields = patch.formFields

        const { error: updateError } = await supabase.from('landing_pages').update(payload).eq('id', id)
        if (updateError) throw updateError
        refresh()
      },
      async duplicateLandingPage(id) {
        const source = landingPages.find((p) => p.id === id)
        if (!source) return
        await supabase.from('landing_pages').insert({
          name: `${source.name} (Copy)`,
          slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
          campaign: source.campaign,
          status: 'Draft',
          visitors: 0,
          leads: 0,
          template_key: source.templateKey,
          content: source.content,
          cta_type: source.ctaType,
          cta_label: source.ctaLabel,
          cta_url: source.ctaUrl,
          has_vsl: source.hasVsl,
          vsl_url: source.vslUrl,
          lead_magnet_url: source.leadMagnetUrl,
          form_fields: source.formFields,
        })
        refresh()
      },
      async addProduct(product) {
        const { data, error: insertError } = await supabase
          .from('products')
          .insert({
            name: product.name,
            description: product.description || '',
            price_ghs: Number(product.priceGhs || 0),
            payment_link: product.paymentLink || '',
            image_url: product.image || '',
            status: product.status || 'Draft',
            sales_count: 0,
          })
          .select('*')
          .single()
        if (insertError) throw insertError
        refresh()
        return mapProduct(data)
      },
      async updateProduct(id, patch) {
        const payload = { updated_at: new Date().toISOString() }
        if (patch.name !== undefined) payload.name = patch.name
        if (patch.description !== undefined) payload.description = patch.description
        if (patch.priceGhs !== undefined) payload.price_ghs = patch.priceGhs
        if (patch.paymentLink !== undefined) payload.payment_link = patch.paymentLink
        if (patch.image !== undefined) payload.image_url = patch.image
        if (patch.status !== undefined) payload.status = patch.status
        if (patch.sales !== undefined) payload.sales_count = patch.sales

        const { error: updateError } = await supabase.from('products').update(payload).eq('id', id)
        if (updateError) throw updateError
        refresh()
      },
    }),
    [
      contacts,
      bookings,
      landingPages,
      products,
      sales,
      emailCampaigns,
      smsCampaigns,
      metaAudiences,
      analytics,
      loading,
      error,
      refresh,
    ],
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('useAdminData must be used inside AdminDataProvider')
  return ctx
}
