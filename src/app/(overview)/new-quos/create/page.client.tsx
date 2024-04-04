'use client'

import { QuoInfoStep } from '@/components/step-sections/quo-info-step'
import { QuoItemsStep } from '@/components/step-sections/quo-items-step'
import { useQuoStore } from '@/store/quos'
import { type CustomersType } from '@/types'

interface Props {
	customers: CustomersType[]
}

export default function Page({ customers }: Props) {
	const step = useQuoStore(state => state.step)

	return (
		<section>
			<div>
				{step}
			</div>
			<div>
				{step === 1 && <QuoInfoStep customers={customers} />}
				{step === 2 && <QuoItemsStep />}
			</div>
		</section>
	)
}
