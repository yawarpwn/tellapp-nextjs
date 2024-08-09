'use server'

import { ProductInsert, ProductUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { ProductsModel } from '@/models/products'
import { redirect } from 'next/navigation'

export async function createProductAction(productToInsert: ProductInsert) {
  const { error } = await ProductsModel.create({
    id: crypto.randomUUID(),
    description: productToInsert.description,
    code: productToInsert.code.toUpperCase(),
    price: productToInsert.price,
    cost: productToInsert.cost,
    category: productToInsert.category,
    link: productToInsert.link,
    unitSize: productToInsert.unitSize,
  })

  if (error) throw error

  revalidatePath('/new-products', 'page')
}

export async function updateProductAction(id: string, productToUpdate: ProductUpdate) {
  const { error } = await ProductsModel.update(id, {
    description: productToUpdate.description,
    code: productToUpdate.code?.toUpperCase(),
    price: productToUpdate.price,
    cost: productToUpdate.cost,
    category: productToUpdate.category,
    link: productToUpdate.link,
    unitSize: productToUpdate.unitSize,
  })

  if (error) throw error

  revalidatePath('/new-products')
  redirect('/new-products')
}

export async function deleteProductAction(id: string): Promise<void> {
  const { error } = await ProductsModel.delete(id)
  if (error) throw error
  revalidatePath('/new-products')
}
