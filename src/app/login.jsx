import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LoginForm from './login-form'

async function Login() {
  const cookiesStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookiesStore })
  const {data: { session}} = await supabase.auth.getSession()
  return <LoginForm session={session} /> 
}

export default Login
