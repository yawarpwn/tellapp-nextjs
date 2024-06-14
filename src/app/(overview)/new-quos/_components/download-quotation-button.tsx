'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { DownloadIcon } from '@/icons'
import { type QuotationType } from '@/types'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { generatePdfDoc } from '@/lib/pdf-doc/pdf-doc'
pdfMake.vfs = pdfFonts.pdfMake.vfs
import 'pdfmake/build/vfs_fonts'

export function DownloadQuotationButton({
  quotation,
}: {
  quotation: QuotationType
}) {
  const downloadPdf = () => {
    const dd = pdfMake.createPdf(
      generatePdfDoc(quotation),
      undefined,
      undefined,
      pdfFonts.pdfMake.vfs,
    )
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
