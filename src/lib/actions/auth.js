'use server'

import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginWithEmailAndPassword({ email, password }) {
	const storeCookie = cookies()
	const supabase = createServerClient(storeCookie)

	const result = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	return JSON.stringify(result)
}

export async function logout() {
	const storedCookie = cookies()
	const supabase = createServerClient(storedCookie)
	await supabase.auth.signOut()
	redirect('/')
}
