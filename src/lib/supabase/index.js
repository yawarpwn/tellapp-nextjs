import {
	createBrowserClient as createBrowserClientSupabase,
	createServerClient as createServerClientSupabase,
} from '@supabase/ssr'

import { NextResponse } from 'next/server'

const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export function createBrowserClient() {
	return createBrowserClientSupabase(SUPABASE_URL, SUPABASE_KEY)
}

export function createServerClient(cookieStore, isServer = true) {
	return createServerClientSupabase(SUPABASE_URL, SUPABASE_KEY, {
		cookies: {
			get(name) {
				return cookieStore.get(name)?.value
			},
			set(name, value, options) {
				if (isServer) return
				cookieStore.set({ name, value, ...options })
			},
			remove(name, options) {
				if (isServer) return
				cookieStore.set({ name, value: '', ...options })
			},
		},
	})
}

export function createMiddlewareClient(request) {
	// Create an unmodified response
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClientSupabase(SUPABASE_URL, SUPABASE_KEY, {
		cookies: {
			cookies: {
				get(name) {
					return request.cookies.get(name)?.value
				},
				set(name, value, options) {
					request.cookies.set({
						name,
						value,
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					response.cookies.set({
						name,
						value,
						...options,
					})
				},
				remove(name, options) {
					request.cookies.set({
						name,
						value: '',
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					response.cookies.set({
						name,
						value: '',
						...options,
					})
				},
			},
		},
	})

	return { supabase, response }
}

export function createActionClient(cookieStore) {
	'use use server'
	return createServerClientSupabase(SUPABASE_URL, SUPABASE_KEY, {
		cookies: {
			get(name) {
				return cookieStore.get(name)?.value
			},
			set(name, value, options) {
				cookieStore.set({ name, value, ...options })
			},
			remove(name, options) {
				cookieStore.set({ name, value: '', ...options })
			},
		},
	})
}

const uploadImage = async (file, path) => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data, error } = await supabase.storage.from('gallery').upload(
		'obras',
		file,
		{
			upsert: true,
		},
	)

	if (error) {
		console.log(error)
	}

	console.log(data)
}
