import { deleteProduct } from '@/lib/actions/products'
import { fetchFilteredProducts } from '@/lib/products-data'
import React from 'react'
import { EditButton } from '../buttons'
import DeleteActionForm from '../delete-action-form'

async function ProductTable({ query, currentPage }) {
	const products = await fetchFilteredProducts({ query, currentPage })

	return (
		<>
			{/* <div className='flex flex-col gap-2 lg:hidden mt-4'> */}
			{/* 	{products?.map((product) => ( */}
			{/* 		<div */}
			{/* 			className='card card-compact bg-base-200 shadow-sm' */}
			{/* 			key={product.id} */}
			{/* 		> */}
			{/* 			<div className='card-body'> */}
			{/* 				<div className='border-b border-b-base-content/10 pb-2'> */}
			{/* 					<p className='text-pretty'>{product.description}</p> */}
			{/* 				</div> */}
			{/* 				<div className='flex justify-between border-b border-b-base-content/10 py-2 text-center'> */}
			{/* 					<p> */}
			{/* 						{product.unit_size} */}
			{/* 					</p> */}
			{/* 					<p>S/ {product.cost.toFixed(2)}</p> */}
			{/* 					<p>S/ {product.price.toFixed(2)}</p> */}
			{/* 				</div> */}
			{/* 				<div className='flex justify-between'> */}
			{/* 					<p> */}
			{/* 						{product.code.toUpperCase()} */}
			{/* 					</p> */}
			{/* 					<p>{product.category}</p> */}
			{/* 					<div className='flex gap-x-2'> */}
			{/* 						<DeleteActionForm */}
			{/* 							id={product.id} */}
			{/* 							deleteAction={deleteProduct} */}
			{/* 						/> */}
			{/* 						<EditButton href={`/products/update/${product.id}`} /> */}
			{/* 					</div> */}
			{/* 				</div> */}
			{/* 			</div> */}
			{/* 		</div> */}
			{/* 	))} */}
			{/* </div> */}

			<div className='overflow-x-auto'>
				<table className='table table-xs mt-4'>
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Descripcion</th>
							<th>Codigo</th>
							<th>U/M</th>
							<th>Costo</th>
							<th>Precio</th>
							<th>Categ</th>
						</tr>
					</thead>
					<tbody>
						{products?.map(product => {
							return (
								<tr key={product.id}>
									<td>
										<div className='flex items-center gap-x-2'>
											<EditButton href={`/products/update/${product.id}`} />
											<DeleteActionForm
												id={product.id}
												deleteAction={deleteProduct}
											/>
										</div>
									</td>
									<td>
										<div>
											<p className='w-[300px]'>{product.description}</p>
										</div>
									</td>
									<td>
										<p className='w-[40px] truncate '>
											{product.code.toUpperCase()}
										</p>
									</td>

									<td>
										{product.unit_size}
									</td>
									<td>{product.cost.toFixed(2)}</td>
									<td>{product.price.toFixed(2)}</td>
									<td>
										<p className='w-[40px] truncate'>
											{product.category}
										</p>
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
