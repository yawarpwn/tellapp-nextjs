'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { DownloadIcon, ShareIcon } from '@/icons'
import { type QuotationType } from '@/types'
import { usePDF } from '@react-pdf/renderer'
import PDFGenerator from './pdf-generator'

export default function DownloadPDF(
	{ quotation }: { quotation: QuotationType },
) {
	const [instance, updateInstance] = usePDF({
		document: <PDFGenerator quotation={quotation} />,
	})

	const ruc = `-${quotation?.ruc}` || ''

	const handleShare = async () => {
		try {
			// Generar el Blob desde el PDF generado
			const pdfBlob = instance.blob

			// Comprobar si el navegador admite la API navigator.share
			if (navigator.share) {
				// Usar la API navigator.share para compartir el Blob del PDF
				await navigator.share({
					files: [
						new File([pdfBlob], `COT-2024-${quotation.number}${ruc}.pdf`, {
							type: 'application/pdf',
						}),
					],
					title: `Cotización ${quotation.number}`,
					text: '¡Echa un vistazo a esta cotización!',
				})
			} else {
				console.log('Tu navegador no admite la API navigator.share')
			}
		} catch (error) {
			console.log('Error al compartir: ', error)
		}
	}

	if (instance.loading) {
		return (
			<div>
				<button className='loading loading-dots'></button>
				<button className='loading loading-dots'></button>
			</div>
		)
	}

	if (instance.error) {
		return <div>Error: {instance.error}</div>
	}

	return (
		<>
			<Button onClick={handleShare} variant='secondary'>
				<ShareIcon size={20} />
				<span className='hidden lg:block ml-2'>Compartir</span>
			</Button>
			<a
				href={instance.url}
				download={`COT-2024-${quotation.number}${ruc}.pdf`}
				className={buttonVariants({ variant: 'secondary' })}
			>
				<DownloadIcon size={20} />
				<span className='hidden lg:block ml-2'>Descargar</span>
			</a>
		</>
	)
}
