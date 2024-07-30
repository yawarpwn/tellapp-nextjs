import {
  Customer,
  Product,
  QuotationItem,
  QuotationClientCreate,
} from '@/types'
import { createStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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
  reset: () => void
}

export type QuotationStore = QuotationState & QuotationActions

export const initQuotationStore = ({
  customers,
  products,
}: {
  // isCustomerServed: boolean
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
    },
    products: products,
    customers: customers,
    items: [],
  }
}

export const createQuotationStore = (initProps: QuotationState) => {
  const res = createStore<QuotationStore>()(set => ({
    ...initProps,
    selectedIdItem: null,
    itemToEdit: null,
    setQuo: quo => set(state => ({ quo: { ...state.quo, ...quo } })),
    setItems: items => set({ items }),
    setIsCustomerServed: () =>
      set(state => ({ ...state, isCustomerServed: true })),
    reset: () => set({ ...initProps }),
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
        },
      })),
  }))

  return res
}
