'use client'
import { usePDF } from '@react-pdf/renderer'
import { useQuotationStore } from '../store/quotation'
import PDFGenerator from './PDFGenerator'
import Quotation from './Quotation'

export default function QuotationPrint() {
	const store = useQuotationStore()
	const [instance] = usePDF({
		document: <PDFGenerator quotation={store.quoToEdit} />,
	})

	const handleClose = () => {
		store.updateQuoToEdit(null)
		store.togglePrintQuo()
	}

	return (
		<aside
			onClick={event => {
				if (event.target !== event.currentTarget) return
				handleClose()
			}}
			className='fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#000005be]'
		>
			<article className='max-w-[768px] h-screen p-4 bg-white'>
				{/* <PDFViewer width='100%' height='700px'> */}
				{/*   <PDFGenerator quotation={store.quoToEdit} /> */}
				{/* </PDFViewer> */}
				<Quotation quotation={store.quoToEdit} />
				<div className='grid grid-cols-2 gap-x-4'>
					<a
						href={instance.url}
						download={`COT-2023-00${store.quoToEdit.quoNumber}.pdf`}
						className='py-4 px-6 bg-purple-500 text-white text-center'
					>
						{instance.loading ? 'Cargando' : 'Descargar PDF'}
					</a>
					<button
						className='py-4 px-6 bg-purple-500 text-white'
						onClick={handleClose}
					>
						cancel
					</button>
				</div>
			</article>
		</aside>
	)
}
