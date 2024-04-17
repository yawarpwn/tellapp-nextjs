import {
	CustomerType,
	ProductType,
	QuotationCreateType,
	QuotationItemType,
	QuotationUpdateType,
} from '@/types'
import { createStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface QuotationState {
	quoNumber: number
	step: number
	isUpdate: boolean
	quo: QuotationCreateType | QuotationUpdateType
	items: QuotationItemType[]
	products: ProductType[]
	customers: CustomerType[]
}

export interface QuotationActions {
	setQuo: (quo: Partial<QuotationCreateType>) => void
	setItems: (item: QuotationItemType[]) => void
	addItem: (item: QuotationItemType) => void
	deleteItem: (id: string) => void
	duplicateItem: (item: QuotationItemType) => void
	editItem: (item: QuotationItemType) => void
	onPickCustomer: (customer: CustomerType) => void
	incrementStep: () => void
	decrementStep: () => void
	reset: () => void
}

export type QuotationStore = QuotationState & QuotationActions

export const initQuotationStore = ({
	quoNumber,
	customers,
	products,
	items,
	quo,
	isUpdate,
}: {
	isUpdate?: boolean
	quoNumber: number
	customers: CustomerType[]
	products: ProductType[]
	quo?: QuotationCreateType | QuotationUpdateType
	items?: QuotationItemType[]
}): QuotationState => {
	return {
		quoNumber,
		step: 1,
		isUpdate: isUpdate || false,
		quo: quo || {
			ruc: '',
			company: '',
			address: '',
			deadline: 0,
			include_igv: true,
			is_regular_customer: false,
		},
		items: items || [],
		products: products,
		customers: customers,
	}
}

const DEFAULT_PROPS: QuotationState = {
	quoNumber: 0,
	step: 1,
	isUpdate: false,
	quo: {
		ruc: '',
		company: '',
		address: '',
		deadline: 0,
		include_igv: true,
		is_regular_customer: false,
	},
	items: [],
	products: [],
	customers: [],
}

// TODO:
// const quoStore= createStore<QuotationStore>()((set) => ({
// })
// )

export const createQuotationStore = (
	initProps: QuotationState = DEFAULT_PROPS,
) => {
	const res = createStore<QuotationStore>()(
		devtools(
			persist(
				(set) => ({
					...initProps,
					incrementStep: () => set(state => ({ step: state.step + 1 })),
					decrementStep: () => set(state => ({ step: state.step - 1 })),
					selectedIdItem: null,
					itemToEdit: null,
					setQuo: (quo) => set((state) => ({ quo: { ...state.quo, ...quo } })),
					setItems: (items) => set((state) => ({ items })),
					reset: () => set({ ...initProps }),
					addItem: (item) =>
						set((state) => ({ items: [...state.items, item] })),
					duplicateItem: (item) =>
						set(state => ({
							items: [...state.items, {
								...item,
								id: crypto.randomUUID(),
							}],
						})),
					deleteItem: (id) =>
						set((state) => ({
							items: state.items.filter(item => item.id !== id),
						})),
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
				}),
				{
					name: 'TELL_QUO',
					partialize: (state) =>
						Object.fromEntries(
							Object.entries(state).filter(([key]) =>
								!['products', 'customers'].includes(key)
							),
						),
					onRehydrateStorage: (state) => {
						console.log('Hydratations starts', state)
						// optional
						return (state, error) => {
							if (error) {
								console.log('an error happened during hydration', error)
							} else {
								console.log('hydration finished')
							}
						}
					},
					skipHydration: true,
				},
			),
		),
	)

	return res
}
