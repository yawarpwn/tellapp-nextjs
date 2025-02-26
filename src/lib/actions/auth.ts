'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UserInsertSchema } from '@/schemas/users'
import { BASE_URL } from '@/constants'

type FormState = {
  message?: string
  errors?: {
    email?: string[]
    password?: string[]
  }
}

export async function signIn(_prevState: FormState, formData: FormData) {
  const entries = Object.fromEntries(formData)

  //validate fields
  const validateFields = UserInsertSchema.safeParse(entries)

  if (!validateFields.success) {
    console.log('zod error', validateFields.error)

    return {
      message: 'Faltan completar campos',
      errors: validateFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validateFields.data

  //Validate is user by email exists in Db
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  const data = (await res.json()) as { token: string }

  if (!data) {
    redirect('/?message=Email o Pasword invalido')
  }

  const oneDay = 24 * 60 * 60 * 1000

  const cookieStore = await cookies()

  cookieStore.set('auth-token', data.token, {
    expires: oneDay, // 1 day
    maxAge: oneDay, // 1 day
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
  })

  // if (error) {
  // 	redirect('/?message=Password or Email invalido')
  // }

  redirect('/new-quos')
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  redirect('/')
}
