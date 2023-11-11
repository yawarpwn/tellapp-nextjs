const URL = 'https://dniruc.apisperu.com/api/v1'
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0'
// https://dniruc.apisperu.com/api/v1/ruc/20131312955?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0

export async function getRuc(ruc) {
  const query = `${URL}/ruc/${ruc}?token=${TOKEN}`
  const res = await fetch(query)
  const data = await res.json()

  console.log('data', data)

  if(data.success === false) {
    console.log('entra aca', data.success)
    return null
  }

  return {
    ruc: data.ruc,
    company: data.razonSocial,
    address: data.direccion ?? '',
  }
}

// data {
//   nombres: 'ERACLEO JUAN',
//   apellidoPaterno: 'HUAMANI',
//   apellidoMaterno: 'MENDOZA',
//   tipoDocumento: '1',
//   numeroDocumento: '46027897',
//   digitoVerificador: ''
// }

// export function getDni(dni) {
//   const URL = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`
//   const token = 'apis-token-6026.Ga7rPY7Cu8q2sEuzkmIVxEdlOMExM6LU'
//   // curl -H 'Accept: application/json' -H "Authorization: Bearer $TOKEN" https://api.apis.net.pe/v2/reniec/dni?numero=46027897
//   return fetch(URL, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Fetching DNI Error')
//       }
//       return res.json()
//     })

//     .then(data => {
//       const { nombres, apellidoPaterno, apellidoMaterno } = data
//       return {
//         ruc: dni,
//         company: `${nombres} ${apellidoPaterno} ${apellidoMaterno}`,
//         address: '',
//       }
//     })
// }

export function getDni(dni) {
  const URL = `https://apiperu.dev/api/dni/${dni}`
  const token =
    '66ec9b5c4d6e359a3ca2117ce321ceddbd1aa54b5ea29a38e0a6eed061308dc1'
  // curl -H 'Accept: application/json' -H "Authorization: Bearer $TOKEN" https://api.apis.net.pe/v2/reniec/dni?numero=46027897
  return (
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      //     {
      //     "numero": "46226429",
      //     "nombre_completo": "ASCA CAMONES, JONI CERILO",
      //     "nombres": "JONI CERILO",
      //     "apellido_paterno": "ASCA",
      //     "apellido_materno": "CAMONES",
      //     "codigo_verificacion": 7,
      //     "direccion": "",
      //     "direccion_completa": "",
      //     "ubigeo_sunat": "",
      //     "ubigeo": [
      //         "",
      //         "",
      //         ""
      //     ]
      // }

      .then(res => {
        if (!res.ok) {
          throw new Error('Fetching DNI Error')
        }
        return res.json()
      })

      .then(data => {
        const { nombres, apellido_paterno, apellido_materno } = data.data
        return {
          ruc: dni,
          company: `${nombres} ${apellido_paterno} ${apellido_materno}`,
          address: '',
        }
      })
  )
}
