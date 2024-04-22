'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
const AuthSchema = z.object({
	password: z.string(),
	email: z.string().email(),
})

type InitialState = {
	message?: string
	error?: string
}

export async function signIn(_: InitialState, formData: FormData) {
	const entries = Object.fromEntries(formData)
	const validateFields = AuthSchema.safeParse(entries)

	if (!validateFields.success) {
		return {
			message: 'Faltan completar campos',
			errors: validateFields.error.flatten().fieldErrors,
		}
	}

	const { email, password } = validateFields.data

	const storeCookie = cookies()
	const supabase = createClient(storeCookie)

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		redirect('/?message=Password or Email invalido')
	}

	redirect('/quotations')
}

export async function signOut() {
	const storeCookie = cookies()
	const supabase = createClient(storeCookie)
	await supabase.auth.signOut()
	redirect('/')
}
