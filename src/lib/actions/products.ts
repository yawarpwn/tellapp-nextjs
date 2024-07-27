'use server'

import { ProductCreateType, ProductId, ProductUpdateType } from '@/types'
import { revalidatePath } from 'next/cache'
import { ProductsModel } from '@/models/products'

export async function createProductAction(productToInsert: ProductCreateType) {
  try {
    await ProductsModel.create({
      id: crypto.randomUUID(),
      description: productToInsert.description,
      code: productToInsert.code,
      price: productToInsert.price,
      cost: productToInsert.cost,
      category: productToInsert.category,
      link: productToInsert.link,
      unitSize: productToInsert.unit_size,
    })
    revalidatePath('/new-products', 'page')
  } catch (error) {
    console.log('ERROR CREATING PRODUCT: ', error)
  }
}

export async function updateProductAction(
  id: ProductId,
  productToUpdate: ProductUpdateType,
): Promise<void> {
  try {
    await ProductsModel.update(id, productToUpdate)
    revalidatePath('/new-products')
  } catch (error) {
    console.log('ERROR UPDATING PRODUCT: ', error)
  }
}

export async function deleteProductAction(id: string): Promise<void> {
  try {
    await ProductsModel.delete(id)
    revalidatePath('/new-products')
  } catch (error) {
    console.log('ERROR DELETING PRODUCT: ', error)
  }
}
