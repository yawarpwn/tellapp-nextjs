export interface RawQuotation {
  id: string
  number: number
  deadline: number
  credit?: null
  includeIgv: boolean
  isPaymentPending: boolean
  items: RawQuotationItem[]
  createdAt: string
  updatedAt: string
  customerId?: string | null
  customer?: RawCustomer | null
}
export interface RawQuotationItem {
  id: string
  price: number
  qty: number
  cost: number
  link: string
  unitSize: string
  description: string
}
export interface RawCustomer {
  id: string
  name: string
  ruc: string
  phone?: null
  address: string
  email?: null
  isRegular: boolean
  createdAt: string
  updatedAt: string
}
export interface Meta {
  totalItems: number
}

export interface RawProduct {
  id: string
  description: string
  code: string
  unitSize: string
  category: string
  link: string
  rank: number
  price: number
  cost: number
  createdAt: string
  updatedAt: string
}

export interface RawAgency {
  id: string
  name: string
  ruc: string
  phone?: null
  address: string
  createdAt: string
  updatedAt: string
}

export interface RawLabel {
  id: string
  recipient: string
  destination: string
  address: string
  dniRuc: string
  phone: string
  observations: string
  agencyId: string
  updatedAt: string
  createdAt: string
  agency: RawAgency
}

export interface Links {}
