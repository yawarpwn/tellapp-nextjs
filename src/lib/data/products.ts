import { ProductsModel } from '@/models'
import type { Product, RawProduct } from '@/types'
import { fetchData } from '@/lib/utils'
import { BASE_URL } from '@/constants'
import { PRODUCT_CATEGORIES_BY_ID } from '@/constants'

export async function fetchProducts(): Promise<Product[]> {
  const { items } = await fetchData<{ items: RawProduct[] }>(`${BASE_URL}/api/products`)
  const mappedProducts: Product[] = items.map(prod => ({
    ...prod,
    createdAt: new Date(prod.createdAt),
    updatedAt: new Date(prod.updatedAt),
  }))

  return mappedProducts
}
