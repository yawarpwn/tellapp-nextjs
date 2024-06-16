import { LabelType } from '@/types'
import { Column, Table } from 'pdfmake/interfaces'
import { getFragileSvg, getLogo } from './constants'

export const gelLabelColumn = (label: LabelType) => {
  const column: Column = {
    table: {
      widths: '*',
      // heights: ['auto', 'auto', 'auto', 'auto', 40, 80, 'auto'],
      body: [
        [
          {
            stack: [
              {
                svg: getLogo({ width: 230, height: 30, fill: '#000' }),
              },
              {
                text: 'Señalizaciones y Dispositivos Se seguridad',
                margin: [0, 3],
              },
              {
                text: 'tellsenales.com',
                italics: true,
              },
            ],
            margin: [0, 10],
            alignment: 'center',
            border: [false, false, false, true],
          },
        ],
        [
          {
            stack: [
              {
                text: 'DESTINATARIO',
                style: 'sectionTitle',
              },
              {
                text: label.recipient,
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],

        [
          {
            stack: [
              {
                text: 'DESTINO',
                style: 'sectionTitle',
              },
              {
                text: label.destination.toUpperCase(),
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],
        [
          {
            stack: [
              {
                text: 'DNI/RUC',
                style: 'sectionTitle',
              },
              {
                text: label.dni_ruc,
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],
        [
          {
            stack: [
              {
                text: 'TELEFONO',
                style: 'sectionTitle',
              },
              {
                text: label.phone || '',
                style: 'sectionContent',
              },
            ],
            style: 'section',
          },
        ],

        [
          {
            stack: [
              {
                text: 'AGENCIA',
                style: 'sectionTitle',
              },
              {
                text: label.agencies?.company || '',
                fontSize: 14,
                bold: true,
              },
              {
                text: label.agencies?.address || '',
                fontSize: 12,
              },
              {
                text: label.agencies?.phone || '',
                fontSize: 12,
              },
            ],
            style: 'section',
          },
        ],
        [
          {
            columns: [
              {
                qr: 'https://tellsenales.com',
                fit: 100,
                padding: 1,
                alignment: 'center',
              },
              {
                svg: getFragileSvg(),
                alignment: 'center',
              },
            ],
            columnGap: 5,
            margin: [0, 5],
          },
        ],
      ],
    },
    layout: 'labelLayout',
  }

  return column
}
