import { formatNumberToLocal, getIgv } from '@/lib/utils'
import type { QuotationType } from '@/types'
import { Content, Table } from 'pdfmake/interfaces'

export function getItemsTable(quotation: QuotationType) {
  const { formatedIgv, formatedSubTotal, formatedTotal } = getIgv(
    quotation.items,
  )

  const itemsTable: Content = {
    table: {
      widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
      headerRows: 1,
      body: [
        [
          'No',
          {
            text: 'DESCRIPCION',
            alignment: 'center',
          },
          {
            text: 'U/M',
            alignment: 'center',
          },
          'CANT',
          'P.UNT',
          'MONTO',
        ],
        ...quotation.items.map((item, index) => {
          const itemNumber = index + 1
          const isEven = itemNumber % 2 === 0
          const evenBackground = '#ededed'
          const oddBackground = '#fff'
          return [
            {
              text: index + 1,
              alignment: 'center',
              margin: [0, 5],
              fillColor: isEven ? evenBackground : oddBackground,
            },
            {
              text: item.description,
              margin: [0, 5],
              fillColor: isEven ? evenBackground : oddBackground,
            },
            {
              text: item.unit_size,
              alignment: 'center',
              margin: [0, 5],
              fillColor: isEven ? evenBackground : oddBackground,
            },
            {
              text: item.qty,
              alignment: 'center',
              margin: [0, 5],
              fillColor: isEven ? evenBackground : oddBackground,
            },
            {
              text: item.price.toFixed(2),
              alignment: 'center',
              margin: [0, 5],
              fillColor: isEven ? evenBackground : oddBackground,
            },
            {
              text: (item.price * item.qty).toFixed(2),
              alignment: 'center',
              margin: [0, 5],
              fillColor: isEven ? evenBackground : oddBackground,
            },
          ]
        }),
        [
          {
            text: 'Descuentos',
            colSpan: 4,
            alignment: 'right',
            margin: [0, 4],
          },
          {},
          {},
          {},
          {
            text: 'S/ 0.00',
            colSpan: 2,
            alignment: 'right',
            margin: [0, 4],
          },
          {},
        ],

        [
          {
            text: 'Total Ventas Gravadas',
            colSpan: 4,
            alignment: 'right',
            margin: [0, 4],
          },
          {},
          {},
          {},
          {
            text: formatedSubTotal,
            colSpan: 2,
            alignment: 'right',
            margin: [0, 4],
          },
          {},
        ],

        [
          {
            text: 'Total IGV (18%)',
            colSpan: 4,
            alignment: 'right',
            margin: [0, 4],
          },
          {},
          {},
          {},
          {
            text: formatedIgv,
            colSpan: 2,
            alignment: 'right',
            margin: [0, 4],
          },
          {},
        ],

        [
          {},
          {},
          {
            text: 'Total',
            alignment: 'right',
            colSpan: 2,
            margin: [0, 4],
            fillColor: '#000',
            color: '#fff',
          },
          {},
          {
            text: formatedTotal,
            colSpan: 2,
            alignment: 'right',
            margin: [0, 4],
            fillColor: '#000',
            color: '#fff',
          },
          {},
        ],
      ],
    },
    layout: 'headerLineOnly',
    marginBottom: 10,
  }

  return itemsTable
}
