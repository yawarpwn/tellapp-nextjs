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
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (session) {
    return (
      <>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={session.user.user_metadata.picture} />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={handleSignOut}>Salir</button>
            </li>
          </ul>
        </div>
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
