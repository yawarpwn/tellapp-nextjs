import { createStore } from 'zustand'

import { type QuotationType } from '@/types'

export type QuotationCreateState = {
  items: QuotationType[]
}

export type QuotationCreateAction = {
  addItem: (item: QuotationType) => void
}

export type QuotationCreateStore = QuotationCreateState & QuotationCreateAction

const initQuotationCreate = (): QuotationCreateState => {
  return {
    items: [],
  }
}

const defaultInitState: QuotationCreateState = {
  items: [],
}

const createQuotationCreateStore = () => {
  return createStore<QuotationCreateStore>()(set => ({
    addItem: item => set(state => ({ items: [...state.items, item] })),
  }))
}
