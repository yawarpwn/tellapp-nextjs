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
		<form>
			Neyda
			<input type='email' placeholder='tu correo' />
			<button>Enviar</button>
		</form>
	)
}
