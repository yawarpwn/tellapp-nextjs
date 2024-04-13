'use client'

import { QuotationCustomerInfo } from '@/components/quotations/customer-info'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { QuotationAddItems } from './add-items'
import { QuotationFinalStep } from './final-step'

export function CreateUpdatePage() {
	const step = useQuotationContext(state => state.step)
	const setStep = useQuotationContext(state => state.setStep)
	return (
		<section>
			<nav className='flex gap-4'>
				<button onClick={() => setStep(1)}>1</button>
				<button onClick={() => setStep(2)}>2</button>
				<button onClick={() => setStep(3)}>3</button>
			</nav>
			{step === 1 && <QuotationCustomerInfo />}
			{step === 2 && <QuotationAddItems />}
			{step === 3 && <QuotationFinalStep />}
		</section>
	)
}
