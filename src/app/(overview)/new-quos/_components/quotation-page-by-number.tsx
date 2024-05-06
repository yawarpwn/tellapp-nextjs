import DownloadPDF from '@/components/pdf/download-pdf'
import { buttonVariants } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { EditIcon } from '@/icons'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { formatDateToLocal, formatNumberToLocal } from '@/lib/utils'
import { getIgv } from '@/lib/utils'
import Link from 'next/link'
import { DeleteButton } from './delete-button'
import { DuplicateButton } from './duplicate-button'
export async function QuotationPageByNumber({ number }: { number: number }) {
	const quotation = await fetchQuotationByNumber({ number })
	const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(
		quotation.items,
	)
	return (
		<>
			<header className='flex justify-end gap-x-2'>
				<div className='flex gap-2'>
					<Link
						href={`/new-quos/${number}/update`}
						className={buttonVariants({ variant: 'secondary' })}
					>
						<EditIcon size={20} />
						<span className='hidden lg:block ml-2'>Editar</span>
					</Link>
					<DownloadPDF quotation={quotation} />
					<DuplicateButton id={quotation.id} />
					<DeleteButton id={quotation.id} />
					{/* <DuplicateQuotation number={number} /> */}
				</div>
			</header>

			<div className='flex justify-end'>
				<div className='text-right'>
					<h2 className='text-2xl md:text-3xl font-semibold'>
						Cotización
					</h2>
					<span className='mt-1 text-xl block text-yellow-500'>
						# {quotation.number}
					</span>
				</div>
			</div>

			<div className='mt-6 grid sm:grid-cols-2 gap-3'>
				<div>
					<h3 className='text-lg font-semibold '>
						{quotation.company}
					</h3>
					<address className='mt-2 not-italic text-muted-foreground '>
						{quotation.address}
					</address>
					<p className='mt-2 text-muted-foreground'>{quotation.ruc}</p>
				</div>
				<div className='sm:text-right space-y-2'>
					<div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
						<dl className='grid sm:grid-cols-6 gap-x-3'>
							<dt className='col-span-3 font-semibold '>
								Fecha:
							</dt>
							<dd className='col-span-3 '>
								{formatDateToLocal(new Date(quotation.created_at))}
							</dd>
						</dl>
						<dl className='grid sm:grid-cols-6 gap-x-3'>
							<dt className='col-span-3 font-semibold '>
								Actualizado:
							</dt>
							<dd className='col-span-3 '>
								{quotation.updated_at && (
									formatDateToLocal(quotation.updated_at)
								)}
							</dd>
						</dl>
						<dl className='grid sm:grid-cols-6 gap-x-3'>
							<dt className='col-span-3 font-semibold '>
								Tiempo de entrega:
							</dt>
							<dd className='col-span-3 '>
								{quotation.deadline} día(s)
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>DESCRIPCION</TableHead>
						<TableHead>U/M</TableHead>
						<TableHead>CANT</TableHead>
						<TableHead>BASE</TableHead>
						<TableHead>P.UNIT</TableHead>
						<TableHead>MONTO</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{quotation.items.map(item => (
						<TableRow key={item.id}>
							<TableCell>
								<div className='min-w-[250px]'>
									{item.description}
								</div>
							</TableCell>
							<TableCell>
								{item.unit_size}
							</TableCell>
							<TableCell>
								{item.qty}
							</TableCell>
							<TableCell>
								{(item.price / 1.18).toFixed(2)}
							</TableCell>
							<TableCell>
								{formatNumberToLocal(item.price)}
							</TableCell>
							<TableCell className='text-right'>
								{formatNumberToLocal(item.price * item.qty)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter className='justify-end' aria-colspan={6}>
					<TableRow>
						<TableCell colSpan={6}>
							<div className='flex gap-4 justify-end'>
								<span>Subtotal</span>
								<span className='w-[100px] text-right'>
									{formatedSubTotal}
								</span>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={6}>
							<div className='flex gap-4 justify-end'>
								<span>Igv</span>
								<span className='w-[100px] text-right'>
									{formatedIgv}
								</span>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={6}>
							<div className='flex gap-4 justify-end'>
								<span>Total</span>
								<span className='w-[100px] text-right'>
									{formatedTotal}
								</span>
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	)
}
