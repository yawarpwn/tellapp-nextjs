import { NoResultRow } from '@/components/no-result-row'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@/components/ui/table'
import { deleteProduct } from '@/lib/actions/products'
import { fetchFilteredProducts } from '@/lib/data/products'
import React from 'react'
import { EditProductForm } from '.'
import { ProductDeleteButton } from './buttons'

interface Props {
	query: string
	currentPage: number
}
async function ProductTable({ query, currentPage }: Props) {
	const products = await fetchFilteredProducts({ query, currentPage })
	const hasProducts = products.length > 0
	return (
		<>
			<div className='overflow-x-auto'>
				<Table className='table table-sm'>
					{/* head */}
					<thead>
						<TableRow>
							<TableHead>Descripcion</TableHead>
							<TableHead>Codigo</TableHead>
							<TableHead>U/M</TableHead>
							<TableHead>Costo</TableHead>
							<TableHead>Precio</TableHead>
							<TableHead>Rank</TableHead>
							<TableHead>Categ</TableHead>
							<TableHead>Acciones</TableHead>
						</TableRow>
					</thead>
					<TableBody>
						{hasProducts
							? products.map(product => {
								return (
									<TableRow key={product.id}>
										{/* Description */}
										<TableCell>
											<div>
												<p className='min-w-[250px]'>{product.description}</p>
											</div>
										</TableCell>
										<TableCell>
											<p className='text-xs'>
												{product.code.toUpperCase()}
											</p>
										</TableCell>

										<TableCell>
											<p className='text-xs'>
												{product.unit_size}
											</p>
										</TableCell>
										<TableCell className='text-xs'>
											{product.cost.toFixed(2)}
										</TableCell>
										<TableCell className='text-xs'>
											{product.price.toFixed(2)}
										</TableCell>
										<TableCell className='text-xs'>{product.rank}</TableCell>
										<TableCell>
											<p className='w-[40px] truncate text-xs'>
												{product.category}
											</p>
										</TableCell>
										<TableCell>
											<div className='flex items-center gap-x-2'>
												<EditProductForm itemToEdit={product} />
												<ProductDeleteButton id={product.id} />
											</div>
										</TableCell>
									</TableRow>
								)
							})
							: <NoResultRow query={query} colSpan={7} />}
					</TableBody>
				</Table>
			</div>
		</>
	)
}

export default ProductTable
