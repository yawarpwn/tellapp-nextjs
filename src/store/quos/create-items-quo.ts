import { StateCreator } from 'zustand'

type QuoItem = {
	id: number
	description: string
	quantity: number
	price: number
}

type QuoItemsState = {
	items: QuoItem[]
	setItems: (items: QuoItem) => void
}

const createItemsQuo: StateCreator<QuoItemsState> = (set) => ({
	items: [],
	setItems: (items) => set((state) => ({ items: [...state.items, items] })),
})

export {
	createItemsQuo,
	type QuoItemsState,
}
