import { Quotation, QuotationCreateType } from '@/types'
import { create } from 'zustand'

interface QuotationState {
	quo: QuotationCreateType
	setQuo: (quo: QuotationCreateType) => void
}

const useQuoStore = create<QuotationState>()((set) => ({
	quo: {
		number: '',
		ruc: '',
		company: '',
		address: '',
		deadline: 1,
		include_igv: true,
		is_regular_customer: false,
		items: [{
			id: '',
			price: 0,
			qty: 0,
			unit_size: '',
			description: '',
		}],
	},
	setQuo: (quo) => set({ quo }),
}))

export { useQuoStore }
