'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { DownloadIcon, ShareIcon } from '@/icons'
import { type QuotationType } from '@/types'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs
import { generatePdfDoc } from '@/lib/pdf-doc/pdf-doc'

export function ShareQuotationButton({
  quotation,
}: {
  quotation: QuotationType
}) {
  const ruc = `-${quotation?.ruc}` || ''

  const handleShare = async () => {
    // 		// Comprobar si el navegador admite la API navigator.share
    if (!navigator.share) {
      console.log('Share api no supported')
      return
    }

    const dd = pdfMake.createPdf(
      generatePdfDoc(quotation),
      undefined,
      undefined,
      pdfFonts.pdfMake.vfs,
    )

    dd.getBlob(
      async pdfBlob => {
        // Usar la API navigator.share para compartir el Blob del PDF
        try {
          await navigator.share({
            files: [
              new File([pdfBlob], `COT-2024-${quotation.number}${ruc}.pdf`, {
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

  return (
    <Button onClick={handleShare} variant="secondary">
      <ShareIcon size={20} />
      <span className="ml-2 hidden lg:block">Compartir</span>
    </Button>
  )
}
