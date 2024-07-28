import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import {
  productsTable,
  type ProductInsert,
  type Product,
  type ProductUpdate,
} from '@/db/schemas'
import { getDatabaseErrorMessage } from '@/lib/utils'

export class ProductsModel {
  static async getAll() {
    const result = await db
      .select({
        id: productsTable.id,
        description: productsTable.description,
        category: productsTable.category,
        code: productsTable.code,
        price: productsTable.price,
        cost: productsTable.cost,
        link: productsTable.link,
        unitSize: productsTable.unitSize,
        createdAt: productsTable.createdAt,
        updatedAt: productsTable.updatedAt,
      })
      .from(productsTable)
      .orderBy(desc(productsTable.updatedAt))

    return result
  }

  static async create(values: ProductInsert) {
    try {
      await db.insert(productsTable).values(values)

      return {
        success: true,
        message: 'Producto Creado',
      }
    } catch (error) {
      const errorMessage = getDatabaseErrorMessage(error)
      return {
        success: false,
        message: errorMessage,
      }
    }
  }

  static async delete(id: Product['id']) {
    await db.delete(productsTable).where(eq(productsTable.id, id))
  }

  static async update(id: Product['id'], value: ProductUpdate) {
    try {
      await db.update(productsTable).set(value).where(eq(productsTable.id, id))
    } catch (error) {
      console.log(error)
      getDatabaseErrorMessage(error)
    }
  }
}
