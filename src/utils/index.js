export function getIgv(items) {
  if (!items) {
    return {
      total: 0,
      subTotal: 0,
      igv: 0,
    }
  }

  const calcTotal = items.reduce((acc, curr) => {
    const result = (acc += curr.price * curr.qty)
    return result
  }, 0)

  const total = calcTotal.toFixed(2)
  const subTotal = (total / 1.18).toFixed(2)
  const igv = (subTotal * 0.18).toFixed(2)

  return {
    total,
    subTotal,
    igv,
  }
}

export const quotationToCreate = {
  ruc: '20100170681',
  company: 'PRODUCTOS QUIMICOS INDUSTRIALES S A',
  address:
    'AV. EL SANTUARIO NRO. 1239 Z.I. ZARATE LIMA LIMA SAN JUAN DE LURIGANCHO',
  deadline: 1,
  items: [
    {
      id: '76ed35bd-5844-437d-a6f2-b985aa8afbf0',
      qty: 4,
      price: 45,
      unit_size: '69x30cm',
      description:
        'Vinil arclad laminado aplicado sobre lamina imantada de 0.8 mm',
    },
    {
      id: 'f7f907ed-aaf0-485a-a2d8-58793e98abf0',
      qty: 1,
      price: 75,
      unit_size: '40x50cm',
      description:
        'Señal vinil arclad laminado c/ soporte compuesto de aluminio ( sustrato de aluminio ) de 4 mm espesor',
    },
    {
      id: '2fd72019-9c29-42c0-88fe-7279f68d0eb5',
      qty: 50,
      price: 4.5,
      unit_size: '20x30cm',
      description:
        'Señal vinil arclad laminado brillo (proteccion UV) c/ soporte pvc celtex espesor = 3 mm',
    },
    {
      id: '883e65c4-66e6-499e-8649-2716a292d750',
      qty: 1,
      price: 5,
      unit_size: '20x30cm',
      description:
        'Señal vinil arclad laminado brillo (proteccion UV) c/ soporte pvc celtex espesor = 3 mm',
    },
    {
      id: 'a1974045-9278-4304-a1ac-a7a6c8e6ddd4',
      qty: 7,
      price: 9,
      unit_size: '40X30',
      description: 'Pvc',
    },
  ],
}
