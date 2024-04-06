'use client'
import {
	QuotationStoreProvider,
	useQuotationContext,
} from '@/hooks/use-quotation-store'
import React from 'react'
import { useBearStore } from './use-bear-store'

function App() {
	const quo = useQuotationContext(state => state.quo)

	return (
		<div>
			{JSON.stringify(quo)}
		</div>
	)
}

export default function PageTest() {
	return (
		<QuotationStoreProvider
			quo={{
				ruc: '206105555362',
				company: 'Neyda SRL',
				address: 'NO seas sapa que tanto miras',
				deadline: 1,
				include_igv: true,
				is_regular_customer: false,
			}}
			items={[{
				id: '1',
				unit_size: '60x60cm',
				description: 'test',
				qty: 1,
				price: 100,
				cost: 10,
			}]}
		>
			<App />
		</QuotationStoreProvider>
	)
}
