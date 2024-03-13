'use client'
import { DownloadIcon, ShareIcon } from '@/icons'
import { usePDF } from '@react-pdf/renderer'
import PDFGenerator from './pdf-generator'

export default function DownloadPDF({ quotation }) {
	const [instance, updateInstance] = usePDF({
		document: <PDFGenerator quotation={quotation} />,
	})

	const handleShare = async () => {
		try {
			// Generar el Blob desde el PDF generado
			const pdfBlob = instance.blob

			// Comprobar si el navegador admite la API navigator.share
			if (navigator.share) {
				// Usar la API navigator.share para compartir el Blob del PDF
				await navigator.share({
					files: [
						new File([pdfBlob], `COT-2024-00${quotation.number}.pdf`, {
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
			<button onClick={handleShare} className='btn'>
				<ShareIcon />
				<span className='hidden lg:block'>Compartir</span>
			</button>
			<a
				href={instance.url}
				download={`COT-2023-00${quotation.number}.pdf`}
				className='btn'
			>
				<DownloadIcon />
				<span className='hidden lg:block'>Descargar</span>
			</a>
		</>
	)
}
