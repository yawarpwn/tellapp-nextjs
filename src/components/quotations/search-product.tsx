import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { Checkbox } from '@radix-ui/react-checkbox'
import React from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useSearch } from '@/hooks/use-search'

export function QuotationSearchProduct() {
	const products = useQuotationContext(state => state.products)
	const addItem = useQuotationContext(state => state.addItem)
	const [selectedProductId, setSelectedProductId] = React.useState<
		string | null
	>(null)
	const [open, setOpen] = React.useState<boolean>(false)

	const { results, searchValue, setSearchValue } = useSearch({
		dataSet: products,
		keys: ['code', 'description'],
	})
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button type='button' className='btn btn-primary'>
					Buscar
				</button>
			</DialogTrigger>
			<DialogContent>
				<header>
					<Input
						onChange={(e) => setSearchValue(e.target.value)}
						value={searchValue}
						type='search'
						placeholder='Ej. Fibra de ...'
					/>
				</header>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>P</TableHead>
							<TableHead>Código</TableHead>
							<TableHead>Descripción</TableHead>
							<TableHead>Precio</TableHead>
							<TableHead>Costo</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{results.map(product => (
							<TableRow key={product.id}>
								<TableCell>
									<input
										onChange={() => setSelectedProductId(product.id)}
										checked={product.id === selectedProductId}
										className='checkbox checkbox-sm'
										type='checkbox'
									/>
									{/* <Checkbox checked /> */}
								</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>{product.code}</TableCell>
								<TableCell>{product.price}</TableCell>
								<TableCell>{product.cost}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<form
					onSubmit={e => {
						e.preventDefault()
						const selectedProduct = products.find(product =>
							product.id === selectedProductId
						)

						if (!selectedProduct) return

						addItem({
							id: crypto.randomUUID(),
							description: selectedProduct.description,
							cost: selectedProduct.cost,
							price: selectedProduct.price,
							unit_size: selectedProduct.unit_size,
							qty: 1,
						})

						setSelectedProductId(null)
						setOpen(false)
					}}
				>
					<footer className='flex items-center justify-between'>
						<button className='btn btn-secondary' type='submit'>Aceptar</button>
						<button
							onClick={() => setOpen(false)}
							className='btn btn-secondary'
							type='button'
						>
							Cancelar
						</button>
					</footer>
				</form>
			</DialogContent>
		</Dialog>
	)
}
