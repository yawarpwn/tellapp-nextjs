'use server'

import { TABLES } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import { ProductCreateSchema, ProductUpdateSchema } from '@/schemas/products'
import { ProductCreateType, ProductUpdateType } from '@/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const TABLE = 'products'

export async function insertProduct(
  productToInsert: ProductCreateType,
): Promise<void> {
  // Insert to Database
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.from(TABLES.Products).insert(productToInsert)

  if (error) {
    console.log(error)
    throw error
  }

  revalidatePath('/new-products')
  // if exists error
  // return new Promise(resolve => setTimeout(resolve, 1000))
}

export async function updateProductAction(
  productToUpdate: ProductUpdateType,
): Promise<void> {
  console.log('update', productToUpdate)

  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase
    .from(TABLES.Products)
    .update({
      ...productToUpdate,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productToUpdate.id)

  if (error) {
    console.log(error)
    throw error
  }

  revalidatePath('/new-products')
}

export async function createProduct(_: undefined, formData: FormData) {
  // Obtenemos valores del formulario
  const rawData = {
    description: formData.get('description'),
    code: formData.get('code'),
    price: formData.get('price'),
    cost: formData.get('cost'),
    category: formData.get('category'),
    unit_size: formData.get('unit_size'),
    rank: formData.get('rank'),
  }

  // Validacion con Zod
  const validatedFields = ProductCreateSchema.safeParse(rawData)

  // En caso de error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos',
    }
  }

  const productToInsert = validatedFields.data

  // Insert to Database
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { error } = await supabase.from(TABLE).insert(productToInsert)

  // if exists error
  if (error) {
    // code must be unique
    if (error.code === '23505') {
      return {
        message: 'Error al ingresar el producto',
        errors: { code: ['Codigo ya existe'] },
      }
    }
  }

  revalidatePath('/products')
}

export async function updateProduct(_: undefined, formData: FormData) {
  const rawData = {
    id: formData.get('id'),
    description: formData.get('description'),
    code: formData.get('code'),
    price: formData.get('price'),
    cost: formData.get('cost'),
    category: formData.get('category'),
    unit_size: formData.get('unit_size'),
    rank: formData.get('rank'),
  }

  const validatedFields = ProductUpdateSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incorrecto.',
    }
  }

  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  // update data in database
  const { error } = await supabase
    .from(TABLE)
    .update(validatedFields.data)
    .eq('id', validatedFields.data.id)

  // if exists error
  if (error) {
    // code must be unique
    if (error.code === '23505') {
      return {
        message: 'Error al ingresar el producto',
        errors: { code: ['Codigo ya existe'] },
      }
    }
  }

  revalidatePath('/products')
}

export async function deleteProduct(_: undefined, formData: FormData) {
  // create supabase client
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const id = formData.get('id')

  // delete data in database
  const { error } = await supabase.from(TABLE).delete().eq('id', id)

  // handle error
  if (error) {
    console.log(error)
  }

  revalidatePath('/products')
}

export async function deleteProductAction(id: number): Promise<void> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  // delete data in database
  const { error } = await supabase.from(TABLES.Products).delete().eq('id', id)

  if (error) {
    console.log(error)
    throw error
  }

  revalidatePath('/new-products')
}
