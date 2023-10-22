'use server'

import z from 'zod'
// import { createClient } from '@supabase/supabase-js'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from "next/cache"
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

// const schema = z.object({
//   company: z.string().nonempty(),
//   ruc: z.string().nonempty().length(11)
// })

// const cookieStore = cookies()
const supabase = createServerActionClient({ cookies})

export async function createAgencie(prevData, formData) {
  const company = formData.get('company')
  const ruc = formData.get('ruc')
  const address = formData.get('address')

  const agencie = {
    company,
    ruc,
    address,
    destinations: []
  }

  try {
    const { data, error } = await supabase.from('agencies').insert(agencie).select().single()
    if (error) throw error
    console.log('insert Row', data)
    revalidatePath('/')
    return {
      message: 'Agencia creada con éxito',
      success: true
    }
  } catch (error) {
    console.log('ERror inserting Row', error)
    return {
      message: 'Error creando agencia',
      success: false
    }
  }

}

export async function deleteAgencieForm(formData) {
  const id = formData.get('id')
  try {
    const { data, error } = await supabase.from('agencies').delete().eq('id', id).select().single()
    if (error) throw error
    console.log('deleted Row', data)
    revalidatePath('/')
  } catch (error) {
    console.log('eRror inserting Row', error)
  }
}
