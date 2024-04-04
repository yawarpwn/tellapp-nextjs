import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type QuoInfo = {
	number: number
	ruc?: string
	address?: string
	company?: string
	deadline: number
	include_igv: boolean
	is_regular_customer: boolean
}

type QuoInfoState = {
	infoQuo: QuoInfo
	setInfoQuo: (infoQuo: QuoInfo) => void
}

const initialState = {
	number: 0,
	ruc: '',
	company: '',
	address: '',
	deadline: 1,
	include_igv: true,
	is_regular_customer: false,
}

const createInfoQuo: StateCreator<QuoInfoState> = (set) => ({
	infoQuo: initialState,
	setInfoQuo: (data) =>
		set((state) => ({ infoQuo: { ...state.infoQuo, ...data } })),
})

export { createInfoQuo, type QuoInfo, type QuoInfoState }
