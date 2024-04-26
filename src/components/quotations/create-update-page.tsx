'use client'

import { QuotationCustomerInfo } from '@/components/quotations/customer-info'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { QUOTATION_LOCALSTORAGE_NAME } from '@/constants'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { useQuotationStore } from '@/hooks/use-quotation-store'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'
import { QuotationAddItems } from './add-items'
import { QuotationFinalStep } from './final-step'

export function CreateUpdatePage() {
	const [confirmModalOpen, setConfirmModalOpen] = React.useState(false)
	const step = useQuotationContext(state => state.step)
	const store = useQuotationStore()

	const isUpdate = useQuotationContext(state => state.isUpdate)

	React.useEffect(() => {
		if (
			localStorage.getItem(QUOTATION_LOCALSTORAGE_NAME) && !isUpdate
		) {
			setConfirmModalOpen(true)
		}
	}, [isUpdate])

	return (
		<section>
			{confirmModalOpen && (
				<Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Recupear Cotización</DialogTitle>
							<DialogDescription>
								Hemos recuperando una cotización no guardarda, ¿Desea
								restaurarla?
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								onClick={() => {
									store?.persist.clearStorage()
									setConfirmModalOpen(false)
								}}
							>
								Cancelar
							</Button>
							<Button
								variant='primary'
								onClick={() => {
									store?.persist.rehydrate()
									setConfirmModalOpen(false)
								}}
							>
								Aceptar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
			{step === 1 && <QuotationCustomerInfo />}
			{step === 2 && <QuotationAddItems />}
			{step === 3 && <QuotationFinalStep />}
		</section>
	)
}
