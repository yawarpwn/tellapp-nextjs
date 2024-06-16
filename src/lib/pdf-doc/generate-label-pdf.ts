import pdfMake from 'pdfmake/build/pdfmake'
import { useMemo } from 'react'
// import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { LabelType } from '@/types'
import { CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces'
import { gelLabelColumn } from './label-column'

export function generateLabelPdf(label: LabelType) {
  const docPdf: TDocumentDefinitions = {
    content: [
      {
        table: {
          widths: ['*', '*', '*'],
          heights: [570, 'auto', 'auto'],
          body: [
            [
              gelLabelColumn(label),
              gelLabelColumn(label),
              gelLabelColumn(label),
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
      },
    ],
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: 10,
    styles: {
      sectionTitle: {
        italics: true,
        fontSize: 10,
        marginBottom: 3,
      },
      sectionContent: {
        bold: true,
        fontSize: 16,
      },
      section: {
        margin: [0, 8],
      },
    },
  }

  const labelLayout: CustomTableLayout = {
    defaultBorder: false,
  }

  const dd = pdfMake.createPdf(
    docPdf,
    { labelLayout },
    {
      Roboto: {
        normal:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
      },
    },
  )

  return dd
}
