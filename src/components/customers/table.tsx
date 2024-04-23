import { EditCustomerForm } from '@/components/customers'
import { NoResultRow } from '@/components/no-result-row'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { fetchFilteredCustomers } from '@/lib/data/customers'
import DeleteForm from './delete-form'

interface Props {
	query: string
	currentPage: number
}
export default async function CustomersTable({ query, currentPage }: Props) {
	const customers = await fetchFilteredCustomers({ query, currentPage })
	const hasCustomers = customers.length > 0
	return (
		<div className='overflow-x-auto'>
			<Table className='table'>
				{/* head */}
				<TableHeader>
					<TableRow>
						<TableHead>Cliente</TableHead>
						<TableHead>Ruc</TableHead>
						<TableHead>Telefono</TableHead>
						<TableHead>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{hasCustomers
						? customers.map(customer => {
							const { id, phone, email, ruc, name, address } = customer
							return (
								<TableRow key={id}>
									<TableCell>
										<div>
											<p className='min-w-[250px] '>{name}</p>
											<p className='min-w-[250px] text-[10px]'>
												{address}
											</p>
										</div>
									</TableCell>
									<TableCell>{ruc}</TableCell>
									<TableCell>{phone}</TableCell>
									<TableCell>
										<div className='flex gap-2'>
											<EditCustomerForm customer={customer} />
											<DeleteForm id={id} />
										</div>
									</TableCell>
								</TableRow>
							)
						})
						: <NoResultRow query={query} colSpan={5} />}
				</TableBody>
			</Table>
		</div>
	)
}
