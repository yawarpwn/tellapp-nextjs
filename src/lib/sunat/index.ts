type Company = {
	ruc: string
	company: string
	address: string
}

export async function getRuc(
	ruc: string,
): Promise<[Error | null, Company | null]> {
	const URL = 'https://dniruc.apisperu.com/api/v1'
	const TOKEN =
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0'
	// https://dniruc.apisperu.com/api/v1/ruc/20131312955?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5leWRhLm1pbGkxMUBnbWFpbC5jb20ifQ.UtiFRViVJrO2YGQ5H3alRcFBhnSwuE5yKU9PYuojgq0
	const query = `${URL}/ruc/${ruc}?token=${TOKEN}`

	try {
		const res = await fetch(query)

		if (!res.ok) {
			throw new Error('Error de petición')
		}

		const data = await res.json()

		// if (data.success === false) {
		// 	return [new Error('Ruc no encotrado'), undefined]
		// }

		const companyFound = {
			ruc: String(data.ruc),
			company: String(data.razonSocial),
			address: String(data.direccion ?? ''),
		}

		return [null, companyFound]
	} catch (error) {
		const errorMessage = error instanceof Error
			? error.message
			: 'Error de petición'
		return [new Error(errorMessage), null]
	}
}

// export async function getDni(dni) {
// 	const URL = `https://apiperu.dev/api/dni/${dni}`
// 	const token =
// 		'66ec9b5c4d6e359a3ca2117ce321ceddbd1aa54b5ea29a38e0a6eed061308dc1'
// 	// curl -H 'Accept: application/json' -H "Authorization: Bearer $TOKEN" https://api.apis.net.pe/v2/reniec/dni?numero=46027897
// 	const res = await fetch(URL, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	})
//
// 	if (!res.ok) {
// 		throw new Error('Error de petición')
// 	}
//
// 	const json = await res.json()
//
// 	if (json.success === false) {
// 		throw new Error('Dni no encontrado')
// 	}
//
// 	const { nombres, apellido_materno, apellido_paterno } = json.data
//
// 	return {
// 		ruc: dni,
// 		company: `${nombres} ${apellido_paterno} ${apellido_materno}`,
// 		address: '',
// 	}
// }
