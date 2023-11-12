
export async function getRuc(ruc) {
  const URL = 'https://dniruc.apisperu.com/api/v1'
  const TOKEN =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0'
  // https://dniruc.apisperu.com/api/v1/ruc/20131312955?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0
  const query = `${URL}/ruc/${ruc}?token=${TOKEN}`
  const res = await fetch(query)
  const data = await res.json()

  console.log('data', data)

  if (data.success === false) {
    throw new Error('Ruc no encotrado')
  }

  return {
    ruc: data.ruc,
    company: data.razonSocial,
    address: data.direccion ?? '',
  }
}

export async function getDni(dni) {
  const URL = `https://apiperu.dev/api/dni/${dni}`
  const token =
    '66ec9b5c4d6e359a3ca2117ce321ceddbd1aa54b5ea29a38e0a6eed061308dc1'
  // curl -H 'Accept: application/json' -H "Authorization: Bearer $TOKEN" https://api.apis.net.pe/v2/reniec/dni?numero=46027897
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await res.json()

  console.log(json)

  if (json.success === false) {
    throw new Error('Dni no encontrado')
  }

  const { nombres, apellido_materno, apellido_paterno } = json.data

  return {
    ruc: dni,
    company: `${nombres} ${apellido_paterno} ${apellido_materno}`,
    address: '',
  }

}
