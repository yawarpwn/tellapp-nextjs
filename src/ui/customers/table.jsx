import { fetchFilteredCustomers } from '@/lib/customers-data'
import DeleteForm from './delete-form'
export default async function CustomersTable({ query, currentPage }) {
	const customers = await fetchFilteredCustomers({ query, currentPage })
	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				{/* head */}
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Ruc</th>
						{/* <th>Telefono</th> */}
						{/* <th>Email</th> */}
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{customers?.map(customer => {
						const { id, phone, email, ruc, name, address } = customer
						return (
							<tr key={id}>
								<td>
									<div>
										<p className='w-[300px] '>{name}</p>
										<p className='text-xs text-base-content'>{address}</p>
									</div>
								</td>
								<td>{ruc}</td>
								{/* <td>{phone}</td> */}
								{/* <td>{email}</td> */}
								<td>
									<div className='flex gap-2'>
										<DeleteForm id={id} />
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
