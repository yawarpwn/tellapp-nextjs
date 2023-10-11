const URL = 'https://dniruc.apisperu.com/api/v1'
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0'
// https://dniruc.apisperu.com/api/v1/ruc/20131312955?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0

export function getRuc(ruc) {
  const query = `${URL}/ruc/${ruc}?token=${TOKEN}`
  return fetch(query)
    .then(res => {
      if (!res.ok) {
        throw new Error('Fetching RUc Error')
      }
      return res.json()
    })
    .then(data => {
      return {
        ruc: data.ruc,
        company: data.razonSocial,
        address: data.direccion,
      }
    })
}

export function getDni(dni) {
  const query = `${URL}/dni/${dni}?token=${TOKEN}`
  return fetch(query)
    .then(res => {
      if (!res.ok) {
        throw new Error('Fetching DNI Error')
      }
      return res.json()
    })
    .then(data => ({
      ruc: data.dni,
      company: `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`,
      address: '',
    }))
}
