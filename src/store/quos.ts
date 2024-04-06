import React from 'react'

import {
	CustomersType,
	ProductType,
	QuotationCreateType,
	QuotationItemType,
} from '@/types'
import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

export interface QuotationProps {
	quo: QuotationCreateType
	items: QuotationItemType[]
	products: ProductType[]
	customers: CustomersType[]
}

export interface QuotationState extends QuotationProps {
	setQuo: (quo: Partial<QuotationCreateType>) => void
	setItems: (item: QuotationItemType[]) => void
	addItem: (item: QuotationItemType) => void
	deleteItem: (id: string) => void
	editItem: (item: QuotationItemType) => void
	onPickCustomer: (customer: CustomersType) => void
}

export const createQuotationStore = (initProps: QuotationProps) => {
	const DEFAULT_PROPS = {
		ruc: null,
		company: null,
		address: null,
		deadline: 1,
		include_igv: true,
		is_regular_customer: false,
	}

	return createStore<QuotationState>()(set => ({
		quo: {
			...DEFAULT_PROPS,
			...initProps?.quo,
		},
		products: initProps.products,
		customers: initProps.customers,
		items: [
			...initProps?.items || [],
		],
		setQuo: (quo) => set((state) => ({ quo: { ...state.quo, ...quo } })),
		setItems: (items) => set((state) => ({ items })),
		addItem: (item) => set((state) => ({ items: [...state.items, item] })),
		deleteItem: (id) =>
			set((state) => ({ items: state.items.filter(item => item.id !== id) })),
		editItem: (item) =>
			set((state) => ({
				items: state.items.map(i => i.id === item.id ? item : i),
			})),
		onPickCustomer: (customer) =>
			set(state => ({
				quo: {
					...state.quo,
					ruc: customer.ruc,
					company: customer.name,
					address: customer.address,
				},
			})),
	}))
}

export type QuotationStore = ReturnType<typeof createQuotationStore>
export const QuotationContext = React.createContext<QuotationState | null>(null)
