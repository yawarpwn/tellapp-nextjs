'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { DownloadIcon } from '@/icons'
import { type QuotationType } from '@/types'

// import * as pdfMake from 'pdfmake/build/pdfmake'
import pdfMake from 'pdfmake/build/pdfmake'
// import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { generatePdfDoc } from '@/lib/pdf-doc/pdf-doc'

export function DownloadQuotationButton({
  quotation,
}: {
  quotation: QuotationType
}) {
  const downloadPdf = () => {
    const dd = pdfMake.createPdf(generatePdfDoc(quotation), undefined, {
      Roboto: {
        normal:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
      },
    })
    dd.download()
  }

  return (
    <Button
      onClick={downloadPdf}
      className={buttonVariants({ variant: 'secondary' })}
    >
      <DownloadIcon size={20} />
      <span className="ml-2 hidden lg:block">Descargar</span>
    </Button>
  )
}
