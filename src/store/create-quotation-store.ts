import {
  Customer,
  Product,
  QuotationItem,
  QuotationClientCreate,
  QuotationClientUpdate,
} from '@/types'
import { createStore, create } from 'zustand'
import { persist } from 'zustand/middleware'

// Tipos de cliente de cotización
type QuotationClientType = QuotationClientCreate | QuotationClientUpdate

// Tipo de estado con inferencia
export interface QuotationState<T extends QuotationClientType> {
  quo: T
  products: Product[]
  customers: Customer[]
  items: QuotationItem[]
}

// Acciones que no dependen del tipo de quo
export interface CommonQuotationActions {
  setQuo: (quo: QuotationClientCreate) => void
  setItems: (item: QuotationItem[]) => void
  addItem: (item: Omit<QuotationItem, 'id'>) => void
  deleteItem: (id: string) => void
  duplicateItem: (item: QuotationItem) => void
  editItem: (id: string, item: Partial<QuotationItem>) => void
  onPickCustomer: (customer: Customer) => void
}

// Acciones específicas que dependen del tipo de quo
export interface QuotationActions<T extends QuotationClientType> {
  setQuo: (quo: Partial<T>) => void
}

// Combinamos el estado y las acciones
export type QuotationStore<T extends QuotationClientType> = QuotationState<T> &
  QuotationActions<T> &
  CommonQuotationActions

// Función para inicializar el estado de la tienda
export const initQuotationStore = ({
  customers,
  products,
  quo,
  items,
}: {
  customers: Customer[]
  products: Product[]
  quo?: QuotationClientUpdate
  items?: QuotationItem[]
}): QuotationState<QuotationClientType> => {
  const quotation = quo || {
    customerId: null,
    deadline: 0,
    includeIgv: true,
    isRegularCustomer: false,
  }
  return {
    quo: quotation,
    products: products,
    customers: customers,
    items: items ?? [],
  }
}

// Función para crear la tienda de cotización
export const createQuotationStore = <T extends QuotationClientType>(
  initProps: QuotationState<T>,
) => {
  const res = create<QuotationStore<T>>()(
    persist(
      (set, get) => ({
        ...initProps,
        setQuo: quo => set(state => ({ quo: { ...state.quo, ...quo } })),
        setItems: items => set({ items }),
        setIsCustomerServed: () => set(state => ({ ...state, isCustomerServed: true })),
        addItem: item =>
          set(state => ({
            items: [
              ...state.items,
              {
                ...item,
                id: crypto.randomUUID(),
              },
            ],
          })),
        deleteItem: id =>
          set(state => ({
            items: state.items.filter(item => item.id !== id),
          })),
        editItem: (id, itemToEdit) =>
          set(state => ({
            items: state.items.map(item => (item.id === id ? { ...item, ...itemToEdit } : item)),
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
              isRegularCustomer: customer.isRegular,
            },
          })),
      }),
      {
        name: 'TELL',

        partialize: state =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !['customers', 'products'].includes(key)),
          ),
        skipHydration: true,
      },
    ),
  )

  return res
}
