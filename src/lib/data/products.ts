import { ProductsModel } from '@/models'
import type { Product } from '@/types'

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await ProductsModel.getAll()
  if (error) throw error
  return data
}
