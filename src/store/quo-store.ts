import { CustomerType } from '@/types'
import { createStore } from 'zustand'

export type QuoState = {
	step: number
	customers: CustomerType[]
}

export type QuotationActions = {
	incrementStep: () => void
	descrementStep: () => void
}

export type QuoStore = QuoState & QuotationActions

const defaultInitialState: QuoState = {
	step: 1,
	customers: [],
}

export const createQuoStore = (
	initialState: QuoState = defaultInitialState,
) => {
	console.log('SERVER:createQuoStore')
	return createStore<QuoStore>()((set) => ({
		...initialState,
		incrementStep: () => set((state) => ({ step: state.step + 1 })),
		descrementStep: () => set((state) => ({ step: state.step - 1 })),
	}))
}
