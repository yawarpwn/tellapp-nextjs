import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req) {
	const requestUrl = new URL(req.url)
	const code = requestUrl.searchParams.get('code')

	console.log(code)

	if (code) {
		const cookieStore = cookies()
		const supabase = createServerClient(cookieStore)
		await supabase.auth.exchangeCodeForSession(code)
	}

	// URL to redirect to after sign in process completes
	return NextResponse.redirect(requestUrl)
}
