'use server'

import { TABLES } from '@/constants'
import { createClient } from '@/lib/supabase/server'
import {
	QuotationCreateSchema,
	QuotationUpdateSchema,
} from '@/schemas/quotations'
import {
	type QuotationCreateType,
	type QuotationItemType,
	type QuotationType,
	type QuotationUpdateType,
} from '@/types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
	fetchLastQuotation,
	fetchQuotationById,
	fetchQuotationByNumber,
} from '../data/quotations'

export async function setQuotation(
	quotation: QuotationUpdateType,
	items: QuotationItemType[],
): Promise<[Error?, QuotationType?]> {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	if (quotation.is_regular_customer) {
		const { data: customerFounds, error: customerFoundError } = await supabase
			.from(TABLES.Customers)
			.select('ruc')
			.eq('ruc', quotation.ruc)

		if (customerFoundError) {
			console.log(customerFoundError)
		}

		if (customerFounds?.length === 0) {
			const { data: customers, error: errorCustomers } = await supabase
				.from(TABLES.Customers)
				.insert({
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
		updated_at: new Date().toISOString(),
		items: items,
	}

	const { data, error } = await supabase
		.from(TABLES.Quotations)
		.update(quotationToUpdate)
		.eq('id', quotation.id)
		.select()

	if (error) {
		console.log('error updating quotation', error)
		return [new Error('Error actualizando cotización')]
	}
	revalidatePath(`/new-quos/${data[0].number}`)
	return [undefined, data[0]]
}

export async function insertQuotation(
	quotation: QuotationCreateType,
	items: QuotationItemType[],
): Promise<[Error?, QuotationType?]> {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	if (quotation.is_regular_customer) {
		const { data: customers, error: errorCustomers } = await supabase
			.from(TABLES.Customers)
			.insert({
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
		created_at: new Date().toISOString(),
		items,
	}

	const { data, error } = await supabase
		.from(TABLES.Quotations)
		.insert(quotationToInsert)
		.select()
		.returns<QuotationType[]>()

	if (error) {
		console.log('error inserting quotation', error)
		return [new Error('Error inserting quotation')]
	}

	revalidatePath('/new-quos')
	return [undefined, data[0]]
}

// Create Product
export async function createQuotation(_: undefined, formData: FormData) {
	const rawData = {
		ruc: formData.get('ruc') || undefined,
		company: formData.get('company') || undefined,
		address: formData.get('address') || undefined,
		deadline: formData.get('deadline'),
		include_igv: formData.get('include_igv'),
		is_regular_customer: formData.get('is_regular_customer'),
	}

	const items = JSON.parse(formData.get('items') as string)

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
		created_at: new Date().toISOString(),
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
		quoNumber: data[0].number,
	}
}

// Update Product
export async function updateQuotation(_: undefined, formData: FormData) {
	const rawData = {
		id: formData.get('id'),
		ruc: formData.get('ruc') || undefined,
		company: formData.get('company') || undefined,
		address: formData.get('address') || undefined,
		deadline: formData.get('deadline'),
		include_igv: formData.get('include_igv'),
		is_regular_customer: formData.get('is_regular_customer'),
	}

	const items = JSON.parse(formData.get('items') as string)

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
		updated_at: new Date().toISOString(),
		// is_regular_customer
	}

	const { error, data } = await supabase.from(TABLES.Quotations).update(
		quotationToUpdate,
	)
		.eq(
			'id',
			id,
		).select()

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
		quoNumber: data[0].number,
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

export async function deleteQuotationAction(id: string) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { error, data } = await supabase
		.from(TABLES.Quotations)
		.delete()
		.eq('id', id)
		.select()

	if (error) {
		console.log(error)
	}

	if (!data) {
		console.log('no data')
		return
	}

	revalidateTag('/new-quos')
	redirect(`/new-quos`)
}

export async function duplicateQuotationAction(id: string) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const quotation = await fetchQuotationById(id)
	const { is_regular_customer, ...restQuotation } = quotation

	const quotationToDuplicate = {
		...restQuotation,
		id: crypto.randomUUID(),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	}

	const { data, error } = await supabase
		.from(TABLES.Quotations)
		.insert(quotationToDuplicate)
		.select()

	if (error) {
		console.log('error duplicating', error)
		throw new Error('Error duplicando cotización')
	}

	if (!data) {
		console.log('no data')
		return
	}

	revalidateTag('/new-quos')
	redirect(`/new-quos/${data[0].number}`)
}

export async function duplicateQuotation(_: undefined, formData: FormData) {
	const number = Number(formData.get('number'))

	// create supabase client
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const quotation = await fetchQuotationByNumber({ number })
	const { number: lastQuotation } = await fetchLastQuotation()

	const dataToDuplicate = {
		number: lastQuotation + 1,
		company: quotation.company,
		ruc: quotation.ruc,
		address: quotation.address,
		deadline: quotation.deadline,
		items: quotation.items,
		include_igv: quotation.include_igv,
	}

	const { data, error } = await supabase
		.from(TABLES.Quotations)
		.insert(dataToDuplicate)

	if (error) {
		console.log(error)
		throw new Error('Error duplicando cotización')
	}

	redirect('/quotations')
}
