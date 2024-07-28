'use server'

const email = 'tellsenales@gmail.com'
const password = 'Ts071020'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { envs } from '@/config'
import { UserInsertSchema } from '@/db/schemas/users'

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
    return {
      message: 'Faltan completar campos',
      errors: validateFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validateFields.data

  //TODO: Validate user in DB

  const authToken = jwt.sign(
    {
      email,
    },
    envs.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  )

  const oneDay = 24 * 60 * 60 * 1000
  cookies().set('auth-token', authToken, {
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
  cookies().delete('auth-token')
  redirect('/')
}
