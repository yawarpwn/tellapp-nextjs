'use server'

import { TABLES } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import {
	QuotationCreateSchema,
	QuotationUpdateSchema,
} from '@/schemas/quotations'
import {
	QuotationCreateType,
	type QuotationCreateWithItems,
	QuotationItemType,
	QuotationUpdateType,
} from '@/types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchLastQuotation, fetchQuotationById } from '../data/quotations'

export async function setQuotation(quotation: QuotationUpdateType) {
	console.log('actualizado...jeje')
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	if (quotation.is_regular_customer) {
		const { data: customerFounds, error: customerFoundError } = await supabase
			.from(TABLES.Customers).select('ruc').eq('ruc', quotation.ruc)

		if (customerFoundError) {
			console.log(customerFoundError)
		}

		if (customerFounds?.length === 0) {
			const { data: customers, error: errorCustomers } = await supabase.from(
				TABLES.Customers,
			).insert({
				name: quotation.company,
				ruc: quotation.ruc,
				address: quotation.address,
			})

			if (errorCustomers) {
				throw errorCustomers
			}
		}
	}

	const quotationToUpdate = {
		ruc: quotation.ruc,
		company: quotation.company,
		address: quotation.address,
		deadline: quotation.deadline,
		include_igv: quotation.include_igv,
		items: quotation.items,
	}

	const { data, error } = await supabase
		.from(TABLES.Quotations)
		.update(quotationToUpdate)
		.eq('id', quotation.id)
		.select()

	if (error) {
		throw error
	}

	if (!data) return

	console.log(data[0])
}

export async function insertQuotation(
	quotation: QuotationCreateType,
	items: QuotationItemType[],
) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	if (quotation.is_regular_customer) {
		const { data: customers, error: errorCustomers } = await supabase.from(
			TABLES.Customers,
		).insert({
			name: quotation.company,
			ruc: quotation.ruc,
			address: quotation.address,
		})

		if (errorCustomers) {
			throw errorCustomers
		}
	}

	const quotationToInsert = {
		ruc: quotation.ruc,
		company: quotation.company,
		address: quotation.address,
		deadline: quotation.deadline,
		include_igv: quotation.include_igv,
		items,
	}

	const { data, error } = await supabase
		.from(TABLES.Quotations)
		.insert(quotationToInsert)
		.select()

	if (error) {
		throw error
	}

	if (!data) return

	console.log(data[0])
}

// Create Product
export async function createQuotation(_: undefined, formData: FormData) {
	const rawData = {
		ruc: formData.get('ruc') || null,
		company: formData.get('company') || 'SIN RUC PROPORCIONADO',
		address: formData.get('address'),
		deadline: formData.get('deadline'),
		items: JSON.parse(formData.get('items') as string),
		include_igv: formData.get('include_igv'),
		is_regular_customer: formData.get('is_regular_customer'),
	}

	// validated fields with zod
	const validatedFields = QuotationCreateSchema.safeParse(rawData)

	// if error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		}
	}

	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		company,
		ruc,
		address,
		deadline,
		items,
		include_igv,
		is_regular_customer,
	} = validatedFields.data

	// Si esta marco como cliente regular agregamos a la DB
	if (is_regular_customer) {
		// buscar si existe el ruc en customers
		const { data: customers, error: customersError } = await supabase.from(
			TABLES.Customers,
		).select().eq(
			'ruc',
			ruc,
		)

		if (customersError) {
			return {
				errors: customersError,
			}
		}

		// si no existe el ruc en customers agregamos
		if (customers?.length === 0) {
			const { error } = await supabase.from(TABLES.Customers)
				.insert({
					ruc,
					name: company,
					address,
				})

			if (error) {
				return {
					errors: error,
				}
			}
		}
	}

	// prepare data to insert
	//
	const quotationToInsert = {
		company,
		ruc,
		address,
		deadline,
		items,
		include_igv,
	}

	const { error, data } = await supabase.from(TABLES.Quotations).insert(
		quotationToInsert,
	).select()

	if (error) {
		return {
			errors: error,
			data: null,
			message: 'Failed to create quotation',
		}
	}

	revalidatePath('/quotations')

	return {
		errors: null,
		message: `Se ha creado la cotización`,
		data: data[0],
	}
}

// Update Product
export async function updateQuotation(_: undefined, formData: FormData) {
	const rawData = {
		id: formData.get('id'),
		ruc: formData.get('ruc') || null,
		company: formData.get('company') || 'Sin Ruc Proporcionado',
		address: formData.get('address'),
		deadline: formData.get('deadline'),
		items: JSON.parse(formData.get('items') as string),
		include_igv: formData.get('include_igv'),
		is_regular_customer: formData.get('is_regular_customer'),
	}

	// validated fields
	const validatedFields = QuotationUpdateSchema.safeParse(rawData)

	// if have error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to UPdate Product.',
		}
	}

	const {
		number,
		id,
		company,
		ruc,
		address,
		deadline,
		items,
		include_igv,
		is_regular_customer,
	} = validatedFields.data

	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	// Si esta marco como cliente regular agregamos a la DB
	if (is_regular_customer) {
		// buscar si existe el ruc en customers
		const { data: customers, error: customersError } = await supabase.from(
			TABLES.Customers,
		).select().eq(
			'ruc',
			ruc,
		)

		if (customersError) {
			return {
				errors: customersError,
			}
		}

		// si no existe el ruc en customers agregamos
		if (customers?.length === 0) {
			const { error } = await supabase.from(TABLES.Customers)
				.insert({
					ruc,
					name: company,
					address,
				})

			if (error) {
				return {
					errors: error,
				}
			}
		}
	}

	const quotationToUpdate = {
		number,
		company,
		ruc,
		address,
		deadline,
		items,
		include_igv,
		// is_regular_customer
	}

	const { error } = await supabase.from(TABLES.Quotations).update(
		quotationToUpdate,
	)
		.eq(
			'id',
			id,
		)

	// handle error
	if (error) {
		return {
			errors: error,
		}
	}

	revalidatePath('/quotations')
	return {
		errors: null,
		message: `Cotización ${number} actualizada correctamente`,
	}
}

export async function deleteQuotation(_: undefined, formData: FormData) {
	const number = Number(formData.get('number'))

	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	await supabase.from(TABLES.Quotations).delete().eq('number', number)
	redirect('/quotations')
}

export async function duplicateQuotation(_: undefined, formData: FormData) {
	const number = Number(formData.get('number'))

	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const quotation = await fetchQuotationById({ number })
	const { number: lastQuotation } = await fetchLastQuotation()

	const dataToDuplicate = {
		number: lastQuotation + 1,
		company: quotation.company,
		ruc: quotation.ruc,
		address: quotation.address,
		deadline: quotation.deadline,
		phone: quotation.phone,
		items: quotation.items,
		include_igv: quotation.include_igv,
	}

	const { data, error } = await supabase
		.from(TABLES.Quotations)
		.insert(dataToDuplicate)

	if (error) {
		console.log(error)
	}

	console.log(data)
	redirect('/quotations')
}
