'use client'
import { useQuoStore } from '@/providers/quo-store-provider'

export function CreateUpdateQuo() {
	const step = useQuoStore(state => state.step)
	const inc = useQuoStore(state => state.incrementStep)
	const desc = useQuoStore(state => state.descrementStep)
	const customers = useQuoStore(state => state.customers)
	return (
		<div>
			{step}
			<div>
				<button onClick={inc}>+</button>
				<button onClick={desc}>-</button>
			</div>
			<pre>
        {JSON.stringify(customers, null, 2)}
			</pre>
		</div>
	)
}
