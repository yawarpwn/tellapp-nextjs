import DownloadPDF from '@/components/pdf/download-pdf'
import { ItemsList } from '@/components/quotations/items-list'
import { Button, buttonVariants } from '@/components/ui/button'
import { EditIcon } from '@/icons'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import Link from 'next/link'

export async function QuotationPageByNumber({ number }: { number: number }) {
	const quotation = await fetchQuotationByNumber({ number })
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
					{/* <DuplicateQuotation number={number} /> */}
				</div>
			</header>

			{/* Contenido */}
			<ItemsList
				company={quotation.company}
				deadline={quotation.deadline}
				quoNumber={quotation.number}
				items={quotation.items}
				address={quotation.address}
				created_at={quotation.created_at}
				updated_at={quotation.updated_at}
				ruc={quotation.ruc}
			/>
		</>
	)
}
