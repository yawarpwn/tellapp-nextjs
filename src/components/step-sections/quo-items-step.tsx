'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useQuoStore } from '@/store/quos'
import React from 'react'
import { StepContainer } from '../step-container'

export function QuoItemsStep() {
	const items = useQuoStore(state => state.items)
	const decreaseStep = useQuoStore(state => state.decreaseStep)
	const step = useQuoStore(state => state.step)

	return (
		<StepContainer
			onPreviousStep={() => decreaseStep(step)}
		>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Item</TableHead>
						<TableHead>Quantity</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell colSpan={4}>
							Sin info
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</StepContainer>
	)
}
