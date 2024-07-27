'use server'

import { ProductInsertType, ProductUpdateType } from '@/types'
import { revalidatePath } from 'next/cache'
import { ProductsModel } from '@/models/products'

export async function createProductAction(productToInsert: ProductInsertType) {
  const result = await ProductsModel.create({
    id: crypto.randomUUID(),
    description: productToInsert.description,
    code: productToInsert.code.toUpperCase(),
    price: productToInsert.price,
    cost: productToInsert.cost,
    category: productToInsert.category,
    link: productToInsert.link,
    unitSize: productToInsert.unitSize,
  })

  if (!result.success) throw new Error(result.message)

  revalidatePath('/new-products', 'page')
}

export async function updateProductAction(
  id: string,
  productToUpdate: ProductUpdateType,
): Promise<void> {
  await ProductsModel.update(id, {
    description: productToUpdate.description,
    code: productToUpdate.code?.toUpperCase(),
    price: productToUpdate.price,
    cost: productToUpdate.cost,
    category: productToUpdate.category,
    link: productToUpdate.link,
    unitSize: productToUpdate.unitSize,
    updatedAt: new Date(),
  })
  revalidatePath('/new-products')
}

export async function deleteProductAction(id: string): Promise<void> {
  try {
    await ProductsModel.delete(id)
    revalidatePath('/new-products')
  } catch (error) {
    console.log('ERROR DELETING PRODUCT: ', error)
  }
}
