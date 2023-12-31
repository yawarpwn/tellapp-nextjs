import { createServerClient } from '@/lib/supabase'
import LoginForm from '@/ui/login-form'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
export default async function Home() {
	const storeCookie = cookies()
	const supabase = createServerClient(storeCookie)
	const { data: { session } } = await supabase.auth.getSession()

	if (session) {
		redirect('/quotations')
	}
	return (
		<>
			{/* <p> */}
			{/* 	<Link href={`${siteUrl}/auth/confirm?token_hash=${token}&type=email`}> */}
			{/* 		Log In */}
			{/* 	</Link> */}
			{/* </p> */}
			<LoginForm />
		</>
	)
}
