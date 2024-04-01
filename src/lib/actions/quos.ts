'use server'

export async function createQuo(data: any) {
	const res = await new Promise((resolve, reject) => {
		resolve({
			success: true,
			data: data,
		})
	})

	return res
}
