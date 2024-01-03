import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const formatDateToLocal = (
	dateStr,
	locale = 'es-US',
) => {
	const date = new Date(dateStr)
	const options = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}
	const formatter = new Intl.DateTimeFormat(locale, options)
	return formatter.format(date)
}

export function getIgv(items) {
	if (!items) {
		return { total: 0, subTotal: 0, igv: 0 }
	}

	const calcTotal = items.reduce((acc, curr) => {
		const result = (acc += curr.price * curr.qty)
		return result
	}, 0)

	const total = calcTotal.toFixed(2)
	const subTotal = (total / 1.18).toFixed(2)
	const igv = (subTotal * 0.18).toFixed(2)

	return { total, subTotal, igv }
}

export const getFormatedDate = date => {
	const currentDate = date ? new Date(date) : new Date()
	const year = currentDate.getFullYear()
	let month = currentDate.getMonth() + 1
	let day = currentDate.getDate()

	const formatedDate = `${year}-${String(month).padStart(2, '0')}-${
		String(day).padStart(2, '0')
	}`
	return formatedDate
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

export function generatePagination(currentPage, totalPages) {
	// Si el total de paginas es menor o igual a 7
	// muestra todas las paginas sin saltos de pagina.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	// Si la pagina actual esta entre las primeras 3
	// Muestra las primeras 3, puntos suspensivos y las ultimas 2 paginas
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages]
	}

	// Si la pagina actual esta entre las ultimas 3
	// Muestra las ultimas 3, un salto de pagina, y las primeras 2 paginas
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
	}

	// Si la pagina actual esta en un punto intermedio
	// Muestra la primera pagina, puntos suspensivos, la pagina actual y sus vecinos,
	// Otros puntos suspensivos y la ultima pagina

	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 2,
		'...',
		totalPages,
	]
}
