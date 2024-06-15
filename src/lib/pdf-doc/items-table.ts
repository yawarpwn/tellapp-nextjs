import { formatNumberToLocal, getIgv } from '@/lib/utils'
import type { QuotationType } from '@/types'
import { Content, Table } from 'pdfmake/interfaces'

export function getItemsTable(quotation: QuotationType) {
  const { formatedIgv, formatedSubTotal, formatedTotal } = getIgv(
    quotation.items,
  )

  const itemsTable: Content = {
    table: {
      widths: ['auto', '*', 'auto', 'auto', 35, 35, 'auto'],
      headerRows: 1,
      body: [
        [
          { text: 'No', color: '#fff', alignment: 'center' },
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
          { text: 'CANT', color: '#fff', alignment: 'center' },
          { text: 'P. BASE', color: '#fff', alignment: 'center' },
          { text: 'P. UNT', color: '#fff', alignment: 'center' },
          { text: 'MONTO', color: '#fff', alignment: 'center' },
        ],
        ...quotation.items.map((item, index) => {
          return [
            // numero
            {
              text: index + 1,
              alignment: 'center',
              margin: [0, 5],
            },

            // description
            {
              text: [
                {
                  text: item.description,
                },
              ],
            },

            // unidad medidad
            {
              text: item.unit_size,
              alignment: 'center',
              margin: [0, 5],
            },

            // cantidad
            {
              text: item.qty,
              alignment: 'center',
              margin: [0, 5],
            },

            // Base
            {
              text: quotation.include_igv
                ? Number(item.price / 1.18).toFixed(2)
                : Number(item.price).toFixed(2),
              alignment: 'center',
              margin: [0, 5],
            },

            // Precio Unitario
            {
              text: Number(item.price).toFixed(2),
              alignment: 'center',
              margin: [0, 5],
            },

            // Total
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
      hLineColor: (index, node) => (index == 1 ? '#000' : '#aaa'),
      // paddingTop: index => (index === 0 ? 4 : 8),
      // paddingBottom: index => (index === 0 ? 4 : 8),
      hLineWidth: index => (index === 0 ? 5 : 10),
      vLineWidth: () => 1,
      vLineColor: '#0d3',
      hLineColor: '#a23',
      vLineStyle: (index, node) => null,
      defaultBorder: false,
    },
    // layout: 'lightHorizontalLines',

    marginBottom: 10,
  }

  return itemsTable
}
