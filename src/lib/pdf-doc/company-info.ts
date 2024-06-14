import { Content, Table } from 'pdfmake/interfaces'

const logo = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    width="189.7"
    height="22.6"
  >
      <path
        d="M30.68 20.31v1.27c0 .4-.22.59-.59.59h-6.28c-.38 0-.59-.19-.59-.59V6.02h-1.79V3.36c.03-.37.24-.51.59-.51h4.69v15.98h1.89V7.43h-.02V1.18L2.69 1.16C1.68 1.16.85 1.98.85 3v5h4.82v15.82h6.99v.02H30.6c1.03 0 1.86-.83 1.86-1.86v-1.67ZM7.45 21.56V6.02H2.63v-2.6c0-.4.22-.59.59-.59h7.55l.03 19.32H8.04c-.38 0-.59-.19-.59-.59zm7.69.61c-.38 0-.59-.19-.59-.59V6.02h-1.74V3.23c0-.21.17-.38.38-.38l4.68.03v15.79l3.46.01v3.49z"
        style="fill: #ff0000"
        transform="translate(-.85 -1.16)"
      />
      <path d="M39.34 6.946h-2.32c-.3 0-.47.17-.47.47v.92H34.1v-2.39c0-1 .34-1.36 1.36-1.36h10.55c1.02 0 1.36.36 1.36 1.36v2.39h-2.45v-.92c0-.3-.17-.47-.47-.47h-2.31v12.76h-2.8zm11.53 0h-1.39v-2.37h9.14c1 0 1.45.45 1.45 1.45v2.3h-2.54v-.91c0-.3-.17-.47-.47-.47h-3.41v3.96h4.9v2.37h-4.9v3.6c0 .3.17.47.47.47h3.49c.3 0 .47-.17.47-.47v-.92h2.54v2.3c0 1.02-.45 1.45-1.45 1.45h-6.86c-1.02 0-1.45-.43-1.45-1.45V6.946zm13.38.47c0-.3-.17-.47-.47-.47h-.91v-2.37h2.73c1.02 0 1.45.45 1.45 1.45v10.85c0 .3.17.47.47.47h3.3c.3 0 .47-.17.47-.47v-.92h2.54v2.3c0 1.02-.43 1.45-1.45 1.45h-6.67c-1.02 0-1.45-.43-1.45-1.45V7.416zm12.3 0c0-.3-.17-.47-.47-.47h-.92v-2.37h2.73c1.02 0 1.45.45 1.45 1.45v10.85c0 .3.17.47.47.47h3.3c.3 0 .47-.17.47-.47v-.92h2.54v2.3c0 1.02-.43 1.45-1.45 1.45H78c-1.02 0-1.45-.43-1.45-1.45zm19.82 8.24s1.56 1.79 3.67 1.79c1.15 0 2.17-.62 2.17-1.79 0-2.58-7.12-2.37-7.12-7.07 0-2.45 2.13-4.26 5.05-4.26 1.77 0 4.5.83 4.5 2.98v1.41h-2.51v-.68c0-.7-1-1.17-2-1.17-1.28 0-2.22.66-2.22 1.62 0 2.58 7.12 2.07 7.12 7.03 0 2.41-1.85 4.45-5.03 4.45-3.35 0-5.2-2.34-5.2-2.34zm12.61-8.71h-1.39v-2.37h9.14c1 0 1.45.45 1.45 1.45v2.3h-2.54v-.91c0-.3-.17-.47-.47-.47h-3.4v3.96h4.9v2.37h-4.9v3.6c0 .3.17.47.47.47h3.49c.3 0 .47-.17.47-.47v-.92h2.54v2.3c0 1.02-.45 1.45-1.45 1.45h-6.86c-1.02 0-1.45-.43-1.45-1.45zm12 10.4h.92c.3 0 .47-.17.47-.47v-12.3h2.51l5.73 8.37c.6.87 1.26 2.13 1.26 2.13h.04s-.15-1.26-.15-2.13v-6.92c0-1 .43-1.45 1.45-1.45h2.73v2.37h-.92c-.3 0-.47.17-.47.47v12.3h-2.49l-5.75-8.35c-.6-.85-1.26-2.13-1.26-2.13h-.04s.15 1.26.15 2.13v6.9c0 1.02-.43 1.45-1.45 1.45h-2.73zM127.2.636c1.47 0 1.83 1.38 2.73 1.38.6 0 .87-.64.87-1.32h1.68c0 1.92-.81 2.92-2.43 2.92-1.47 0-1.83-1.38-2.73-1.38-.6 0-.87.62-.87 1.32h-1.68c0-1.94.81-2.92 2.43-2.92zm10.76 16.71h.34c.36 0 .53-.09.66-.47l4.5-12.3h2.92l4.47 12.3c.13.38.3.47.66.47h.34v2.37h-1.66c-1.07 0-1.45-.28-1.79-1.24l-.94-2.64h-5.11l-.94 2.64c-.34.96-.7 1.24-1.77 1.24h-1.68zm8.86-3.82-1.3-3.79c-.28-.83-.6-2.26-.6-2.26h-.04s-.32 1.43-.6 2.26l-1.3 3.79zm8.44-6.11c0-.3-.17-.47-.47-.47h-.92v-2.37h2.73c1.02 0 1.45.45 1.45 1.45v10.85c0 .3.17.47.47.47h3.3c.3 0 .47-.17.47-.47v-.92h2.54v2.3c0 1.02-.43 1.45-1.45 1.45h-6.67c-1.02 0-1.45-.43-1.45-1.45zm12.3-.47h-1.39v-2.37h9.14c1 0 1.45.45 1.45 1.45v2.3h-2.54v-.91c0-.3-.17-.47-.47-.47h-3.41v3.96h4.9v2.37h-4.9v3.6c0 .3.17.47.47.47h3.49c.3 0 .47-.17.47-.47v-.92h2.54v2.3c0 1.02-.45 1.45-1.45 1.45H169c-1.02 0-1.45-.43-1.45-1.45V6.946zm13.53 8.71s1.56 1.79 3.67 1.79c1.15 0 2.17-.62 2.17-1.79 0-2.58-7.12-2.37-7.12-7.07 0-2.45 2.13-4.26 5.05-4.26 1.77 0 4.5.83 4.5 2.98v1.41h-2.51v-.68c0-.7-1-1.17-2-1.17-1.28 0-2.22.66-2.22 1.62 0 2.58 7.12 2.07 7.12 7.03 0 2.41-1.85 4.45-5.03 4.45-3.35 0-5.2-2.34-5.2-2.34z"/>
  </svg>

`
export const companyInfo: Content = {
  columns: [
    [
      {
        svg: logo,
        marginBottom: 10,
      },
      {
        text: 'Maquinaria 325 Urb. Villa Señor de los Milagros',
        marginBottom: 5,
      },
      {
        text: 'Carmen de la Legua - Reynoso - Callao',
      },
    ],
    {
      table: {
        widths: ['*', 30, 'auto', 100],
        body: [
          [
            {},
            {
              text: 'Ruc',
              border: [false, true, false, false],
              marginTop: 5,
            },

            {
              text: ':',
              border: [false, true, false, false],
            },
            {
              marginTop: 5,
              text: '20610555536',
              border: [false, true, false, false],
              alignment: 'right',
            },
          ],

          [
            {},
            {
              text: 'Email',
            },
            ':',
            {
              text: 'ventas@tellsenales.com',
              alignment: 'right',
            },
          ],

          [
            {},
            {
              text: 'Web',
            },
            ':',
            {
              text: 'tellsenales.com',
              link: 'https://tellsenales.com',
              alignment: 'right',
            },
          ],

          [
            {},
            {
              text: 'Tel',
              border: [false, false, false, true],
              marginBottom: 5,
            },
            {
              text: ':',
              border: [false, false, false, true],
            },
            {
              text: '971531018',
              border: [false, false, false, true],
              marginBottom: 5,
              alignment: 'right',
            },
          ],
        ],
      },
      layout: {
        paddingRight: () => 0,
        paddingLeft: () => 0,
        paddingBottom: () => 1,
        paddingTop: () => 1,
        defaultBorder: false,
      },
    },
  ],
}
