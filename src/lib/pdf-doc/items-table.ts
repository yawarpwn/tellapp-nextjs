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
          { text: 'No', color: '#fff' },
          {
            text: 'DESCRIPCION',
            alignment: 'center',
            color: '#fff',
          },
          {
            text: 'U/M',
            alignment: 'center',
            color: '#fff',
          },
          { text: 'CANT', color: '#fff' },
          { text: 'P.UNT', color: '#fff' },
          { text: 'MONTO', color: '#fff' },
        ],
        ...quotation.items.map((item, index) => {
          return [
            {
              text: index + 1,
              alignment: 'center',
              margin: [0, 5],
            },
            {
              text: item.description,
              margin: [0, 5],
            },
            {
              text: item.unit_size,
              alignment: 'center',
              margin: [0, 5],
            },
            {
              text: item.qty,
              alignment: 'center',
              margin: [0, 5],
            },
            {
              text: Number(item.price / 1.18).toFixed(2),
              alignment: 'center',
              margin: [0, 5],
            },
            {
              text: (Number(item.price) * Number(item.qty)).toFixed(2),
              alignment: 'center',
              margin: [0, 5],
            },
          ]
        }),
      ],
    },
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        if (rowIndex === 0) return '#7d2de0'

        return rowIndex % 2 === 0 ? '#ededed' : null
      },

      defaultBorder: false,
    },
    // layout: 'lightHorizontalLines',

    marginBottom: 10,
  }

  return itemsTable
}
