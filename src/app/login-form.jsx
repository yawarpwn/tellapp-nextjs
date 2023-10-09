'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

function LoginForm({ session }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (session) {
    return(
      <>
        <p>Logged in as {session.user.email}</p>
        <button onClick={handleSignOut}>Sign out</button>
      </>
    ) 
  }

  return (
    <>
      <button onClick={handleSignIn}>Sign in</button>
    </>
  )
}

export default LoginForm
