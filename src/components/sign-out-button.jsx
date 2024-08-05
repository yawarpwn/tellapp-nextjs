'use client'

import { LogoutIcon } from '@/icons'
import { signOut } from '@/lib/actions/auth'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending} className="my-2 inline-block w-full">
      <div className="flex w-full gap-4 rounded-md py-3 pl-5 hover:bg-[rgb(27,28,32)] hover:text-white">
        {pending ? <Loader2 className="animate-spin" /> : <LogoutIcon />}

        <span>Salir</span>
      </div>
    </button>
  )
}

function SignOutButton() {
  return (
    <form action={signOut}>
      <SubmitButton />
    </form>
  )
}

export default SignOutButton
