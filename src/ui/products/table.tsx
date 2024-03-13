import { deleteProduct } from '@/lib/actions/products'
import { fetchFilteredProducts } from '@/lib/data/products'
import React from 'react'
import DeleteActionForm from '../delete-action-form'
import { EditProductForm } from '.'

async function ProductTable({ query, currentPage }) {
	const products = await fetchFilteredProducts({ query, currentPage })

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
						{products?.map(product => {
							return (
								<tr key={product.id}>
									{/* Description */}
									<td>
										<div>
											<p className='w-[300px]'>{product.description}</p>
										</div>
									</td>
									{/* Code */}
									<td>
										<p>
											{product.code.toUpperCase()}
										</p>
									</td>

									<td>
										<p>
											{product.unit_size}
										</p>
									</td>
									<td>{product.cost.toFixed(2)}</td>
									<td>{product.price.toFixed(2)}</td>
									<td>
										<p className='w-[40px] truncate'>
											{product.category}
										</p>
									</td>
									<td>
										<div className='flex items-center gap-x-2'>
											<EditProductForm itemToEdit={product} />
											<DeleteActionForm
												id={product.id}
												deleteAction={deleteProduct}
											/>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default ProductTable
