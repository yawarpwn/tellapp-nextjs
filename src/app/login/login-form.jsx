'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
// import { useState } from 'react'

export default function LoginForm() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   })
  //   router.refresh()
  // }

  // const handleSignIn = async () => {
  //   await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   })
  //   router.refresh()
  // }

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut()
  //   router.refresh()
  // }

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut()
  //   router.refresh()
  // }

  return (
    <>
      <form>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Correo</span>
          </label>
          <input
            type="email"
            id="email"
            className="input input-bordered"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Constraseña</span>
          </label>
          <input
            type="password"
            id="password"
            className="input input-bordered"
            required
          />
        </div>
        <button type="submit" className="btn mt-4">
          Iniciar Session
        </button>
      </form>
      <div className="mt-4">
        <button onClick={handleSignIn} type="button" className="btn">
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Entrar con Google
        </button>
      </div>
    </>
  )
}
