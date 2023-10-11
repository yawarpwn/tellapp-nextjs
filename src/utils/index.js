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

