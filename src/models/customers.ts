import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { type CustomerInsert, type Customer } from '@/schemas'
import { customersTable } from '@/db/schemas'
import postgres from 'postgres'
import { DatabaseResponse } from '@/types'
import { DatabaseError } from '@/errors'

export class CustomersModel {
  static async getAll(): Promise<DatabaseResponse<Customer[]>> {
    try {
      const result = await db
        .select({
          id: customersTable.id,
          name: customersTable.name,
          ruc: customersTable.ruc,
          address: customersTable.address,
          phone: customersTable.phone,
          email: customersTable.email,
          isRegular: customersTable.isRegular,
          createdAt: customersTable.createdAt,
          updatedAt: customersTable.updatedAt,
        })
        .from(customersTable)
        .orderBy(desc(customersTable.updatedAt))

      return {
        data: result,
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError(),
      }
    }
  }

  static async getById(id: string): Promise<DatabaseResponse<Customer>> {
    try {
      const result = await db.select().from(customersTable).where(eq(customersTable.id, id))
      return {
        error: null,
        data: result[0],
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError(),
      }
    }
  }

  static async getByRuc(ruc: Customer['ruc']): Promise<DatabaseResponse<Customer>> {
    try {
      const result = await db.select().from(customersTable).where(eq(customersTable.ruc, ruc))

      return {
        error: null,
        data: result[0],
      }
    } catch (error) {
      return {
        error: new Error(`Error al buscar  por Ruc: ${ruc}`),
        data: null,
      }
    }
  }

  static async create(value: CustomerInsert): Promise<DatabaseResponse<Customer>> {
    try {
      const rows = await db.insert(customersTable).values(value).returning()

      return {
        error: null,
        data: rows[0],
      }
    } catch (error) {
      console.log(error)
      let errorMessage = 'Error al intentar crear el cliente'

      if (error instanceof postgres.PostgresError) {
        if (error.constraint_name === '_customers_ruc_unique') {
          errorMessage = 'Ruc Ingresado  ya existe'
        }
      }

      return {
        data: null,
        error: DatabaseError.internalError(errorMessage),
      }
    }
  }

  static async delete(id: Customer['id']): Promise<DatabaseResponse<{ id: string }>> {
    try {
      await db.delete(customersTable).where(eq(customersTable.id, id))
      return {
        data: { id: id },
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: DatabaseError.internalError('Error al eliminar el cliente'),
      }
    }
  }

  static async toggleIsRegular(
    id: Customer['id'],
    value: boolean,
  ): Promise<DatabaseResponse<Customer>> {
    try {
      const result = await db
        .update(customersTable)
        .set({
          isRegular: value,
        })
        .where(eq(customersTable.id, id))
        .returning()

      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      return {
        error: DatabaseError.internalError('Error al actualizar el cliente'),
        data: null,
      }
    }
  }

  static async update(
    id: Customer['id'],
    value: Partial<Omit<Customer, 'id' | 'createdAt'>>,
  ): Promise<DatabaseResponse<Customer>> {
    try {
      const result = await db
        .update(customersTable)
        .set(value)
        .where(eq(customersTable.id, id))
        .returning()
      return {
        error: null,
        data: result[0],
      }
    } catch (error) {
      return {
        data: null,
        error: DatabaseError.internalError('Error al actualizar el cliente'),
      }
    }
  }
}
