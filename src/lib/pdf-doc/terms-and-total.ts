import { type QuotationType } from '@/types'

import { getIgv } from '@/lib/utils'
import { Content, Table } from 'pdfmake/interfaces'

export function getTermAndTotal(quotation: QuotationType) {
  const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(
    quotation.items,
  )

  const deadlineText =
    quotation.deadline < 1
      ? `${quotation.deadline} día útil`
      : `${quotation.deadline} dias utiles`

  const content: Content = {
    columns: [
      {
        table: {
          body: [
            [
              {
                text: 'Términos y condiciones',
                color: '#7d2de0',
                fontSize: 10,
                bold: true,
                colSpan: 3,
              },
              {},
              {},
            ],
            [
              'Tiempo de entrega',
              {
                text: ':',
                margin: [4, 0],
              },
              {
                text: [
                  {
                    text: deadlineText,
                    bold: true,
                  },
                  ', una vez recepcionada la Orden de Compra',
                ],
              },
            ],
            [
              'Forma de pago',
              { text: ':', margin: [4, 0] },
              {
                text: quotation.credit
                  ? `${quotation.credit} dias credito`
                  : '50% adelanto , 50% contraentrega',
              },
            ],
            ['Validez ', { text: ':', margin: [4, 0] }, '35 días'],
          ],
        },
        layout: {
          defaultBorder: false,
          paddingLeft: () => 0,
          paddingRight: () => 0,
        },
      },
      {
        table: {
          widths: ['*', 80],
          body: [
            [
              {
                text: 'Descuentos',
                alignment: 'right',
              },
              {
                text: '- S/ 0.00',
                alignment: 'right',
              },
            ],

            [
              {
                text: 'Total Ventas Gravadas',
                alignment: 'right',
              },
              {
                text: formatedSubTotal,
                alignment: 'right',
              },
            ],

            [
              {
                text: 'Total IGV (18%)',
                alignment: 'right',
              },
              {
                text: formatedIgv,
                alignment: 'right',
              },
            ],
            [
              {
                text: 'Total',
                alignment: 'right',
                bold: true,
                fontSize: 10,
              },
              {
                text: formatedTotal,
                alignment: 'right',
                bold: true,
                fontSize: 10,
              },
            ],
          ],
        },
        layout: {
          defaultBorder: false,
        },
      },
    ],
  }

  return content
}
