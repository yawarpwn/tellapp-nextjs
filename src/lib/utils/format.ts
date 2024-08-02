import { type QuotationItem } from '@/types'

export const formatDateToLocal = (
  date: Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  const formatter = new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    ...options,
  })
  return formatter.format(date)
}

export function formatNumberToLocal(price: number) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(price)
}

export const getFormatedDate = (date: string | Date) => {
  const currentDate = date ? new Date(date) : new Date()
  const year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let day = currentDate.getDate()

  const formatedDate = `${year}-${String(month).padStart(2, '0')}-${String(
    day,
  ).padStart(2, '0')}`
  return formatedDate
}

export function getIgv(items: QuotationItem[]) {
  if (!items) {
    return { total: 0, subTotal: 0, igv: 0 }
  }

  const calcTotal = items.reduce((acc, curr) => {
    const result = (acc += curr.price * curr.qty)
    return result
  }, 0)

  const total = calcTotal
  const subTotal = total / 1.18
  const igv = subTotal * 0.18

  return {
    total: total.toFixed(2),
    subTotal: subTotal.toFixed(2),
    igv: igv.toFixed(2),
    formatedTotal: formatNumberToLocal(total),
    formatedIgv: formatNumberToLocal(igv),
    formatedSubTotal: formatNumberToLocal(subTotal),
    totalItems: items.length,
  }
}
