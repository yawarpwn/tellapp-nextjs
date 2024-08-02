'use client'
import { Button } from '@/components/ui/button'
import { ShareIcon } from '@/icons'
import { DownloadIcon } from '@/icons'
import { generateQuotationPdf } from '@/lib/pdf-doc/generate-quotation-pdf'
import { type QuotationClient } from '@/types'
import pdfMake from 'pdfmake/build/pdfmake'
import { useMemo } from 'react'
// import * as pdfFonts from 'pdfmake/build/vfs_fonts'

export function DownloadAndShareButtons({
  quotation,
}: {
  quotation: QuotationClient
}) {
  //WARN: Mejorar legibilidad
  const date = Intl.DateTimeFormat('es-PE')
    .format(quotation.updatedAt)
    .replace(/\//g, '-')
  const ruc = quotation.company
    ? `-${quotation.company.replace(/\./g, '').split(' ').join('-')}`
    : `-${date}-SIN-RUC`
  const diferenceTime =
    Number(quotation.updatedAt) - Number(quotation.createdAt)
  const isUpdate = diferenceTime > 0

  const pdfFileName = `${quotation.number}-COT${ruc}${isUpdate ? '-ACTUALIZADO' : ''}.pdf`

  const dd = useMemo(
    () =>
      pdfMake.createPdf(generateQuotationPdf(quotation), undefined, {
        Roboto: {
          normal:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
        },
      }),
    [quotation],
  )

  const handleShare = async () => {
    // 		// Comprobar si el navegador admite la API navigator.share
    if (!navigator.share) {
      console.log('Share api no supported')
      return
    }

    dd.getBlob(
      async pdfBlob => {
        // Usar la API navigator.share para compartir el Blob del PDF
        try {
          await navigator.share({
            files: [
              new File([pdfBlob], pdfFileName, {
                type: 'application/pdf',
              }),
            ],
            title: `Cotización ${quotation.number}`,
            text: '¡Echa un vistazo a esta cotización!',
          })
        } catch (error) {
          console.log('Error al interntar compartir', error)
        }
      },
      {
        progressCallback: progress => {
          console.log(progress)
        },
      },
    )
  }

  const downloadPdf = () => {
    // dd.open()
    dd.download(pdfFileName)
  }

  return (
    <>
      <Button onClick={downloadPdf} variant="secondary" size={'sm'}>
        <DownloadIcon size={20} />
        <span className="ml-2 hidden lg:block">Descargar</span>
      </Button>

      <Button onClick={handleShare} variant="secondary" size={'sm'}>
        <ShareIcon size={20} />
        <span className="ml-2 hidden lg:block">Compartir</span>
      </Button>
    </>
  )
}
