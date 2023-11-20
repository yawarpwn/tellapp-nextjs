'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PowerIcon } from '@/icons'

function SignOutButton() {
  const supabase = createClientComponentClient()

  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button className="btn btn-md" onClick={signOut}>
      <PowerIcon />
    </button>
  )
}

export default SignOutButton
