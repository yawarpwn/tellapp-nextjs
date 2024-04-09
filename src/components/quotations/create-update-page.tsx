'use client'

import { QuotationCustomerInfo } from '@/components/quotations/customer-info'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { QuotationAddItems } from './add-items'

export function CreateUpdatePage() {
	const step = useQuotationContext(state => state.step)
	return (
		<section>
			<nav>
				{step}
			</nav>
			{step === 1 && <QuotationCustomerInfo />}
			{step === 2 && <QuotationAddItems />}
		</section>
	)
}
