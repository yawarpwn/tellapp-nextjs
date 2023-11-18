// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import LoginForm from './login-form'
//
// export const dynamic = 'force-dynamic'
// export default async function Login() {
//   const supabase = createServerComponentClient({ cookies })
//
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()
//
//   return <LoginForm session={session} />
// }

import AuthForm from '@/ui/auth-form'

export default function Home() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Supabase Auth + Storage</h1>
        <p className="">
          Experience our Auth and Storage through a simple profile management
          example. Create a user profile and upload an avatar image. Fast,
          simple, secure.
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  )
}
