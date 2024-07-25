type Company = {
  ruc: string
  company: string
  address: string
}

class HttpError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export async function getRuc(ruc: string): Promise<Company> {
  console.log('ruc', ruc)
  const URL = 'https://dniruc.apisperu.com/api/v1'
  const TOKEN =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0'
  // https://dniruc.apisperu.com/api/v1/ruc/20131312955?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0
  const query = `${URL}/ruc/${ruc}?token=${TOKEN}`

  try {
    const res = await fetch(query)

    if (!res.ok) {
      throw new HttpError('Error al realizar la  petición')
    }

    const data = await res.json()

    if (data.success === false) {
      throw new HttpError('No se encontraron resultados')
    }

    const companyFound = {
      ruc: String(data.ruc),
      company: String(data.razonSocial),
      address: String(data.direccion ?? ''),
    }
    return companyFound
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
    throw new Error('Error no se puede identificar la empresa')
  }
}

export async function getDni(dni: string): Promise<Company> {
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
  try {
    if (!res.ok) {
      throw new HttpError('Error al realizar la petición')
    }

    const json = await res.json()

    if (json.success === false) {
      throw new HttpError('No se encontraron registros')
    }

    const { nombres, apellido_materno, apellido_paterno, ruc } = json.data

    return {
      ruc: String(ruc),
      company: `${nombres} ${apellido_paterno} ${apellido_materno}`,
      address: '',
    }
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
    throw new Error('Error no se puede identificar la empresa')
  }
}
