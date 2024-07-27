import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { productsTable, type ProductInsert, type Product } from '@/db'

export class ProductsModel {
  static async getAll() {
    const result = await db
      .select({
        id: productsTable.id,
        description: productsTable.description,
        code: productsTable.code,
        price: productsTable.price,
        cost: productsTable.cost,
        link: productsTable.link,
        unit_size: productsTable.unitSize,
        created_at: productsTable.createdAt,
        updated_at: productsTable.updatedAt,
      })
      .from(productsTable)

    return result
  }

  static async getById(id: Product['id']) {
    const result = await db
      .select({
        id: productsTable.id,
        description: productsTable.description,
        code: productsTable.code,
        price: productsTable.price,
        cost: productsTable.cost,
        link: productsTable.link,
        unit_size: productsTable.unitSize,
        created_at: productsTable.createdAt,
        updated_at: productsTable.updatedAt,
      })
      .from(productsTable)
      .where(eq(productsTable.id, id))
    return result[0]
  }

  static async create(value: ProductInsert): Promise<{ id: Product['id'] }> {
    const rows = await db.insert(productsTable).values(value).returning({
      id: productsTable.id,
    })
    return rows[0]
  }

  static async delete(id: Product['id']) {
    await db.delete(productsTable).where(eq(productsTable.id, id))
  }

  static async update(
    id: Product['id'],
    value: Partial<Omit<Product, 'id' | 'createdAt'>>,
  ) {
    await db.update(productsTable).set(value).where(eq(productsTable.id, id))
  }
}
