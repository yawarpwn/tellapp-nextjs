import { fetchQuotationByNumber } from '@/lib/data/quotations'
import React from 'react'

export default async function PageTest() {
	const quo = await fetchQuotationByNumber({ number: 4020 })
	console.log(quo)
	return (
		<form>
			Neyda
			<input type='email' placeholder='tu correo' />
			<button>Enviar</button>
		</form>
	)
}
