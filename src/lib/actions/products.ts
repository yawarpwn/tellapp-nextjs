'use server'

import { ProductInsert, ProductUpdate } from '@/types'
import { revalidatePath } from 'next/cache'
import { ProductsModel } from '@/models/products'
import { redirect } from 'next/navigation'
import { BASE_URL, PRODUCT_CATEGORIES_BY_ID } from '@/constants'
import { fetchData } from '@/lib/utils'

export async function createProductAction(productToInsert: ProductInsert) {
  const product = {
    description: productToInsert.description,
    code: productToInsert.code.toUpperCase(),
    price: productToInsert.price,
    cost: productToInsert.cost,
    category: productToInsert.category,
    categoryId: PRODUCT_CATEGORIES_BY_ID[productToInsert.category],
    link: productToInsert.link,
    unitSize: productToInsert.unitSize,
  }

  await fetchData(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  revalidatePath('/new-products')
}

export async function updateProductAction(id: string, productToUpdate: ProductUpdate) {
  const product = {
    description: productToUpdate.description,
    code: productToUpdate.code?.toUpperCase(),
    price: productToUpdate.price,
    cost: productToUpdate.cost,
    category: productToUpdate.category,
    categoryId: productToUpdate.category && PRODUCT_CATEGORIES_BY_ID[productToUpdate.category],
    link: productToUpdate.link,
    unitSize: productToUpdate.unitSize,
  }

  await fetchData(`${BASE_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  revalidatePath('/new-products')
}

export async function deleteProductAction(id: string): Promise<void> {
  await fetchData(`${BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
  })
  revalidatePath('/new-products')
}

export async function duplicateProductAction(id: string) {
  const product = await fetchData(`${BASE_URL}/api/products/${id}`)
  await fetchData(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...product,
      code: `${product.code}-COPY`,
    }),
  })
  revalidatePath('/new-products')
}
