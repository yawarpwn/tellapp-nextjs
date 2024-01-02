import { deleteProduct } from '@/lib/actions/products'
import { fetchFilteredProducts } from '@/lib/products-data'
import React from 'react'
import { EditButton } from '../buttons'
import DeleteActionForm from '../delete-action-form'

async function ProductTable({ query, currentPage }) {
	const products = await fetchFilteredProducts({ query, currentPage })

	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				{/* head */}
				<thead>
					<tr>
						<th></th>
						<th>Descripcion</th>
						<th>Codigo</th>
						<th>U/M</th>
						<th>Costo</th>
						<th>Precio</th>
						<th>Categoria</th>
					</tr>
				</thead>
				<tbody>
					{products?.map(product => {
						return (
							<tr key={product.id}>
								<td className='flex gap-x-2'>
									<DeleteActionForm
										id={product.id}
										deleteAction={deleteProduct}
									/>
									<EditButton href={`/products/update/${product.id}`} />
								</td>
								<td>
									<div>
										<p className='w-[300px]'>{product.description}</p>
									</div>
								</td>
								<td>
									<p className='w-[70px] font-bold text-xs'>
										{product.code.toUpperCase()}
									</p>
								</td>

								<td>{product.unit_size}</td>
								<td>{product.cost.toFixed(2)}</td>
								<td>{product.price.toFixed(2)}</td>
								<td>{product.category}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default ProductTable
