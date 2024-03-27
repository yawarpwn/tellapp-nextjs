import { deleteProduct } from '@/lib/actions/products'
import { fetchFilteredProducts } from '@/lib/data/products'
import React from 'react'
import { NoResultRow } from '@/components/no-result-row'
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
				<table className='table table-sm'>
					{/* head */}
					<thead>
						<tr>
							<th>Descripcion</th>
							<th>Codigo</th>
							<th>U/M</th>
							<th>Costo</th>
							<th>Precio</th>
							<th>Categ</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{hasProducts
							? products.map(product => {
								return (
									<tr key={product.id}>
										{/* Description */}
										<td>
											<div>
												<p className='min-w-[250px]'>{product.description}</p>
											</div>
										</td>
										<td>
											<p className='text-xs'>
												{product.code.toUpperCase()}
											</p>
										</td>

										<td>
											<p className='text-xs'>
												{product.unit_size}
											</p>
										</td>
										<td className='text-xs'>{product.cost.toFixed(2)}</td>
										<td className='text-xs'>{product.price.toFixed(2)}</td>
										<td>
											<p className='w-[40px] truncate text-xs'>
												{product.category}
											</p>
										</td>
										<td>
											<div className='flex items-center gap-x-2'>
												<EditProductForm itemToEdit={product} />
												<ProductDeleteButton id={product.id} />
											</div>
										</td>
									</tr>
								)
							})
							: <NoResultRow query={query} colSpan={7} />}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default ProductTable
