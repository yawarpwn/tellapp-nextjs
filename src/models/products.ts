import { type ProductInsert, type Product, type ProductUpdate } from '@/schemas'
import type { DatabaseResponse } from '@/types'
import { DatabaseError } from '@/errors'
import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { productsTable } from '@/db/schemas'

export class ProductsModel {
  static async getAll(): Promise<DatabaseResponse<Product[]>> {
    try {
      const result = await db
        .select({
          id: productsTable.id,
          description: productsTable.description,
          category: productsTable.category,
          code: productsTable.code,
          price: productsTable.price,
          cost: productsTable.cost,
          link: productsTable.link,
          rank: productsTable.rank,
          unitSize: productsTable.unitSize,
          createdAt: productsTable.createdAt,
          updatedAt: productsTable.updatedAt,
        })
        .from(productsTable)
        .orderBy(desc(productsTable.updatedAt))
        .limit(500)

      return {
        data: result,
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener los productos'),
      }
    }
  }
  static async getById(id: string): Promise<DatabaseResponse<Product>> {
    try {
      const result = await db
        .select({
          id: productsTable.id,
          description: productsTable.description,
          category: productsTable.category,
          code: productsTable.code,
          price: productsTable.price,
          cost: productsTable.cost,
          link: productsTable.link,
          rank: productsTable.rank,
          unitSize: productsTable.unitSize,
          createdAt: productsTable.createdAt,
          updatedAt: productsTable.updatedAt,
        })
        .from(productsTable)
        .where(eq(productsTable.id, id))

      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener producto ' + id),
      }
    }
  }

  static async create(values: ProductInsert): Promise<DatabaseResponse<Product>> {
    try {
      const result = await db.insert(productsTable).values(values).returning()

      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al crear el producto'),
      }
    }
  }

  static async delete(id: Product['id']): Promise<DatabaseResponse<Product>> {
    try {
      const result = await db.delete(productsTable).where(eq(productsTable.id, id))
      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al eliminar el producto'),
      }
    }
  }

  static async update(id: Product['id'], value: ProductUpdate): Promise<DatabaseResponse<Product>> {
    try {
      const result = await db
        .update(productsTable)
        .set({
          ...value,
          updatedAt: new Date(),
        })
        .where(eq(productsTable.id, id))
      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al actualizar el producto'),
      }
    }
  }
}
