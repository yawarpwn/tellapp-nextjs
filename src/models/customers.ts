import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { type CustomerInsert, type Customer } from '@/schemas'
import { customersTable } from '@/db/schemas'
import postgres from 'postgres'

export class CustomersModel {
  static async getAll(): Promise<Customer[]> {
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

    return result
  }

  static async getById(id: Customer['id']) {
    const result = await db
      .select({
        id: customersTable.id,
        name: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        isRegular: customersTable.isRegular,
        createdAt: customersTable.createdAt,
        updatedAt: customersTable.updatedAt,
      })
      .from(customersTable)
      .where(eq(customersTable.id, id))
    return result[0]
  }

  static async getByRuc(ruc: Customer['ruc']) {
    const result = await db
      .select({
        id: customersTable.id,
        name: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        isRegular: customersTable.isRegular,
        createdAt: customersTable.createdAt,
        updatedAt: customersTable.updatedAt,
      })
      .from(customersTable)
      .where(eq(customersTable.ruc, ruc))
    return result[0]
  }

  static async create(
    value: CustomerInsert,
  ): Promise<{ success: boolean; data: Customer | null; message: string }> {
    try {
      const rows = await db.insert(customersTable).values(value).returning()

      return {
        success: true,
        data: rows[0],
        message: 'Cliente Creado',
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
        success: false,
        data: null,
        message: errorMessage,
      }
    }
  }

  static async delete(id: Customer['id']) {
    await db.delete(customersTable).where(eq(customersTable.id, id))
  }

  static async toggleIsRegular(
    id: Customer['id'],
    value: boolean,
  ): Promise<void> {
    await db
      .update(customersTable)
      .set({
        isRegular: value,
      })
      .where(eq(customersTable.id, id))
  }

  static async update(
    id: Customer['id'],
    value: Partial<Omit<Customer, 'id' | 'createdAt'>>,
  ) {
    await db.update(customersTable).set(value).where(eq(customersTable.id, id))
  }
}
