'use client'

import { QuotationCustomerInfo } from '@/components/quotations/customer-info'
import { QUOTATION_LOCALSTORAGE_NAME } from '@/constants'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import React from 'react'
import { QuotationAddItems } from './add-items'
import { QuotationFinalStep } from './final-step'

export function CreateUpdatePage() {
	const step = useQuotationContext(state => state.step)
	const reset = useQuotationContext(state => state.reset)

	React.useEffect(() => {
		console.log('effect')
		console.log(
			useQuotationContext,
		)
		// console.log(localStorage.getItem(QUOTATION_LOCALSTORAGE_NAME))
	}, [])
	return (
		<section>
			{step === 1 && <QuotationCustomerInfo />}
			{step === 2 && <QuotationAddItems />}
			{step === 3 && <QuotationFinalStep />}
		</section>
	)
}
