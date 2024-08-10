import { type QuotationClient } from '@/types'

import { getIgv } from '@/lib/utils'
import { Content, Table } from 'pdfmake/interfaces'

export function getTermAndTotal(quotation: QuotationClient) {
  const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(quotation.items)

  const deadlineText =
    quotation.deadline === 1
      ? `${quotation.deadline} día útil`
      : `${quotation.deadline} días útiles`

  const content: Content = {
    columns: [
      {
        table: {
          widths: [70, 'auto', '*'],
          body: [
            [
              {
                text: 'Términos y condiciones:',
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
                margin: [2, 0],
              },
              {
                text: [
                  {
                    text: deadlineText,
                    bold: true,
                    italics: true,
                  },
                  { text: ', una vez recepcionada la OC', italics: true },
                ],
              },
            ],
            [
              'Forma de pago',
              { text: ':', margin: [2, 0] },
              {
                text: quotation.credit
                  ? `Crédito ${quotation.credit} días `
                  : '50% adelanto , 50% contraentrega',
                italics: true,
              },
            ],
            [
              'Validez ',
              { text: ':', margin: [2, 0] },
              {
                text: '30 días',
                italics: true,
              },
            ],
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
                text: 'Sub Total Ventas Gravadas',
                alignment: 'right',
              },
              {
                text: quotation.includeIgv ? formatedSubTotal : 'S/ 0.00',
                alignment: 'right',
              },
            ],

            [
              {
                text: 'IGV (18%)',
                alignment: 'right',
              },
              {
                text: quotation.includeIgv ? formatedIgv : 'S/ 0.00',
                alignment: 'right',
              },
            ],
            [
              {
                text: [
                  {
                    text: quotation.includeIgv ? 'Importe Total' : 'Total',
                    bold: true,
                  },
                  {
                    text: quotation.includeIgv ? '' : ' ( No Incluye IGV)',
                    fontSize: 8,
                  },
                ],
                alignment: 'right',
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
