import { QuotationCreateType, QuotationItemType } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type QuoActionsType = {
	setQuo: (quo: Partial<QuotationCreateType>) => void
	setItems: (item: QuotationItemType[]) => void
	addItem: (item: QuotationItemType) => void
	deleteItem: (id: string) => void
	editItem: (item: QuotationItemType) => void
}

type QuoState = QuoActionsType & {
	quo: QuotationCreateType
	items: QuotationItemType[]
}

const useQuoStore = create<QuoState>()(set => ({
	quo: {
		ruc: null,
		company: null,
		address: null,
		deadline: 1,
		include_igv: true,
		is_regular_customer: false,
	},
	items: [{
		id: '0',
		price: 0,
		qty: 0,
		unit_size: 'und',
		cost: 1,
		description: '',
	}],
	setQuo: (quo) => set((state) => ({ quo: { ...state.quo, ...quo } })),
	setItems: (items) => set((state) => ({ items })),
	addItem: (item) => set((state) => ({ items: [...state.items, item] })),
	deleteItem: (id) =>
		set((state) => ({ items: state.items.filter(item => item.id !== id) })),
	editItem: (item) =>
		set((state) => ({
			items: state.items.map(i => i.id === item.id ? item : i),
		})),
}))

export { useQuoStore }
