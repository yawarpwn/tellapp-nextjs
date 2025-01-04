'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { envs } from '@/config'
import { UserInsertSchema } from '@/schemas/users'
import { UsersModel } from '@/models/users'

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
  const { data } = await UsersModel.getUserByEmail(email)

  if (!data) {
    redirect('/?message=Email invalido')
  }

  //validate password
  const isValidPassword = bcrypt.compareSync(password, data.password)

  if (!isValidPassword) {
    redirect('/?message=Password invalido')
  }

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

  const cookieStore = await cookies()

  cookieStore.set('auth-token', authToken, {
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
