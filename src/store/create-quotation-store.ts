import {
  Customer,
  Product,
  QuotationItem,
  QuotationClientCreate,
} from '@/types'
import { createStore, create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface QuotationState {
  isCustomerServed: boolean
  quo: QuotationClientCreate
  products: Product[]
  customers: Customer[]
  items: QuotationItem[]
}

export interface QuotationActions {
  setQuo: (quo: QuotationClientCreate) => void
  setItems: (item: QuotationItem[]) => void
  addItem: (item: QuotationItem) => void
  deleteItem: (id: string) => void
  setIsCustomerServed: () => void
  duplicateItem: (item: QuotationItem) => void
  editItem: (id: string, item: Partial<QuotationItem>) => void
  onPickCustomer: (customer: Customer) => void
}

export type QuotationStore = QuotationState & QuotationActions

export const initQuotationStore = ({
  customers,
  products,
}: {
  customers: Customer[]
  products: Product[]
}): QuotationState => {
  return {
    isCustomerServed: false,
    quo: {
      customerId: null,
      deadline: 1,
      includeIgv: true,
      isRegularCustomer: false,
      credit: null,
    },
    products: products,
    customers: customers,
    items: [],
  }
}

export const createQuotationStore = (initProps: QuotationState) => {
  const res = create<QuotationStore>()(
    persist(
      (set, get) => ({
        ...initProps,
        selectedIdItem: null,
        itemToEdit: null,
        setQuo: quo => set(state => ({ quo: { ...state.quo, ...quo } })),
        setItems: items => set({ items }),
        setIsCustomerServed: () =>
          set(state => ({ ...state, isCustomerServed: true })),
        addItem: item =>
          set(state => ({
            items: [...state.items, item],
          })),
        deleteItem: id =>
          set(state => ({
            items: state.items.filter(item => item.id !== id),
          })),
        editItem: (id, itemToEdit) =>
          set(state => ({
            items: state.items.map(item =>
              item.id === id ? { ...item, ...itemToEdit } : item,
            ),
          })),
        duplicateItem: item =>
          set(state => ({
            items: [
              ...state.items,
              {
                ...item,
                id: crypto.randomUUID(),
              },
            ],
          })),
        onPickCustomer: customer =>
          set(state => ({
            quo: {
              ...state.quo,
              company: customer.name,
              ruc: customer.ruc,
              address: customer.address,
              customerId: customer.id,
            },
          })),
      }),
      {
        name: 'TELL',

        partialize: state =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !['customers', 'products'].includes(key),
            ),
          ),
        skipHydration: true,
      },
    ),
  )

  return res
}
