import { type Items } from '@/types'
import { clsx } from 'clsx'
import { type ClassNameValue, twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassNameValue[]) {
	return twMerge(clsx(inputs))
}

export const formatDateToLocal = (
	dateStr: string | Date,
	locale = 'es-US',
	options?: Intl.DateTimeFormatOptions,
) => {
	const date = new Date(dateStr)

	const defaultOptions: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		...options,
	}
	const formatter = new Intl.DateTimeFormat(locale, defaultOptions)
	return formatter.format(date)
}

export function formatNumberToLocal(price: number) {
	return new Intl.NumberFormat('es-PE', {
		style: 'currency',
		currency: 'PEN',
	}).format(price)
}

export function getIgv(items: Items[]) {
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
	}
}

export const getFormatedDate = (date: string) => {
	const currentDate = date ? new Date(date) : new Date()
	const year = currentDate.getFullYear()
	let month = currentDate.getMonth() + 1
	let day = currentDate.getDate()

	const formatedDate = `${year}-${String(month).padStart(2, '0')}-${
		String(day).padStart(2, '0')
	}`
	return formatedDate
}

export function isValidNumber(str: string) {
	// Si es null o undefined
	if (!str) return false

	// Si es un string vacio
	if (str.trim() === '') return false

	// Convertimos a numero
	const number = Number(str)

	// Es un numero valido
	if (isNaN(number)) return false

	// Es un numero valido
	return true
}

export function generatePagination(currentPage: number, totalPages: number) {
	// Si el total de paginas es menor o igual a 7
	// muestra todas las paginas sin saltos de pagina.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1) // [1, 2, 3, 4, 5, 6, 7]
	}

	// Si la pagina actual esta entre las primeras 3
	// Muestra las primeras 3, puntos suspensivos y las ultimas 2 paginas
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages] // [1, 2, 3, '...', 6, 7]
	}

	// Si la pagina actual esta entre las ultimas 3
	// Muestra las ultimas 3, un salto de pagina, y las primeras 2 paginas
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages] // [1, 2, '...', 6, 7, 8]
	}

	// Si la pagina actual esta en un punto intermedio
	// Muestra la primera pagina, puntos suspensivos, la pagina actual y sus vecinos,
	// Otros puntos suspensivos y la ultima pagina
	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	] // [1, '...', 3, 4, 5, '...', 8]
}
