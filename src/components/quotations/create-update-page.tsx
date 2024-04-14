'use client'

import { QuotationCustomerInfo } from '@/components/quotations/customer-info'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { CustomersIcon, QuotationIcon } from '@/icons'
import { cn } from '@/lib/utils'
import { ShoppingBasket } from 'lucide-react'
import { QuotationAddItems } from './add-items'
import { QuotationFinalStep } from './final-step'

export function CreateUpdatePage() {
	const step = useQuotationContext(state => state.step)
	const setStep = useQuotationContext(state => state.setStep)
	const steps = [{
		quoStep: 1,
		Icon: CustomersIcon,
		label: 'Cliente',
	}, {
		quoStep: 2,
		Icon: ShoppingBasket,
		label: 'Productos',
	}, {
		quoStep: 3,
		Icon: QuotationIcon,
		label: 'Finalizar',
	}]
	return (
		<section>
			<nav className='my-6'>
				<ul
					defaultValue={'step-1'}
					className='grid grid-cols-3 gap-4'
				>
					{steps.map(({ quoStep, Icon, label }) => (
						<li key={quoStep}>
							<button
								onClick={() => setStep(quoStep)}
								data-active={quoStep === step}
								className={cn(
									`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 w-full 
                  hover:bg-accent hover:text-accent-foreground data-[active]:`,
									quoStep === step && 'border-primary',
								)}
							>
								<Icon />
								{label}
							</button>
						</li>
					))}
				</ul>
			</nav>
			{step === 1 && <QuotationCustomerInfo />}
			{step === 2 && <QuotationAddItems />}
			{step === 3 && <QuotationFinalStep />}
		</section>
	)
}
