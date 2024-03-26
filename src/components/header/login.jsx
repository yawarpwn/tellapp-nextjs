import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import LoginForm from './login-form'

async function Login() {
	const cookiesStore = cookies()
	const supabase = createServerClient({ cookies: () => cookiesStore })
	const {
		data: { session },
	} = await supabase.auth.getSession()
	return <LoginForm session={session} />
}

export default Login
