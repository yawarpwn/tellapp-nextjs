import { Customer, Product, QuotationItem, QuotationInsert } from '@/types'
import { createStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface QuotationState {
  isCustomerServed: boolean
  customer?: Customer
  quo: Omit<QuotationInsert, 'number'>
  products: Product[]
  customers: Customer[]
}

export interface QuotationActions {
  setQuo: (quo: QuotationInsert) => void
  // setItems: (item: QuotationItem[]) => void
  addItem: (item: QuotationItem) => void
  deleteItem: (id: string) => void
  setIsCustomerServed: () => void
  duplicateItem: (item: QuotationItem) => void
  editItem: (item: QuotationItem) => void
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
      items: [],
    },
    products: products,
    customers: customers,
  }
}

export const createQuotationStore = (initProps: QuotationState) => {
  const res = createStore<QuotationStore>()(set => ({
    ...initProps,
    selectedIdItem: null,
    itemToEdit: null,
    setQuo: quo => set(state => ({ quo: { ...state.quo, ...quo } })),
    setIsCustomerServed: () =>
      set(state => ({ ...state, isCustomerServed: true })),
    reset: () => set({ ...initProps }),
    addItem: item =>
      set(state => ({
        quo: {
          ...state.quo,
          items: [...state.quo.items, item],
        },
      })),
    deleteItem: id =>
      set(state => ({
        quo: {
          ...state.quo,
          items: state.quo.items.filter(item => item.id !== id),
        },
      })),
    editItem: item =>
      set(state => ({
        quo: {
          ...state.quo,
          items: state.quo.items.map(i => (i.id === item.id ? item : i)),
        },
      })),
    duplicateItem: item =>
      set(state => ({
        quo: {
          ...state.quo,
          items: [
            ...state.quo.items,
            {
              ...item,
              id: crypto.randomUUID(),
            },
          ],
        },
      })),
    onPickCustomer: customer =>
      set(state => ({
        isCustomerServed: true,
        customer: customer,
      })),
  }))

  return res
}
