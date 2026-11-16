export function mapContact(row, activities = []) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone || '',
    company: row.company || '',
    source: row.source || 'Direct',
    service: row.service || '',
    status: row.status || 'New',
    tags: row.tags || [],
    createdAt: row.created_at?.slice(0, 10) || '',
    marketingConsent: Boolean(row.marketing_consent),
    notes: row.notes || '',
    activities: activities.map((a) => ({
      id: a.id,
      type: a.type,
      label: a.label,
      at: new Date(a.occurred_at).toLocaleString(),
    })),
  }
}

export function mapBooking(row) {
  return {
    id: row.id,
    contactName: row.contact_name,
    contactEmail: row.contact_email || '',
    type: row.type,
    date: row.booking_date,
    time: row.booking_time,
    status: row.status,
    notes: row.notes || '',
  }
}

export function mapLandingPage(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    campaign: row.campaign || '',
    status: row.status,
    visitors: row.visitors || 0,
    leads: row.leads || 0,
    createdAt: row.created_at?.slice(0, 10) || '',
  }
}

export function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    priceGhs: Number(row.price_ghs || 0),
    paymentLink: row.payment_link || '',
    image: row.image_url || '',
    status: row.status,
    sales: row.sales_count || 0,
  }
}

export function mapSale(row) {
  return {
    id: row.id,
    product: row.product_name,
    customer: row.customer_name,
    amountGhs: Number(row.amount_ghs || 0),
    date: row.sale_date,
    status: row.status,
  }
}

export function mapEmailCampaign(row) {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    recipients: row.recipients || 0,
    sent: row.sent || 0,
    opens: row.opens || 0,
    clicks: row.clicks || 0,
    provider: row.provider || 'Not connected',
  }
}

export function mapSmsCampaign(row) {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    segment: row.segment || '',
    recipients: row.recipients || 0,
    provider: row.provider || 'Not connected',
  }
}

export function mapMetaAudience(row) {
  return {
    id: row.id,
    name: row.name,
    contacts: row.contacts_count || 0,
    status: row.status,
    connection: row.connection || 'Not connected',
  }
}
