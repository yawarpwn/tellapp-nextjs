import { db } from '@/db'
import { eq, asc, desc } from 'drizzle-orm'
import { customersTable, type CustomerInsert, type Customer } from '@/db'

export class Customers {
  static async getAll() {
    const result = await db
      .select({
        id: customersTable.id,
        name: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        is_regular_customer: customersTable.isRegular,
        created_at: customersTable.createdAt,
        updated_at: customersTable.updatedAt,
      })
      .from(customersTable)

    return result
  }

  static async getById(id: Customer['id']) {
    const result = await db
      .select({
        id: customersTable.id,
        name: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        is_regular_customer: customersTable.isRegular,
        created_at: customersTable.createdAt,
        updated_at: customersTable.updatedAt,
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
        is_regular_customer: customersTable.isRegular,
        created_at: customersTable.createdAt,
        updated_at: customersTable.updatedAt,
      })
      .from(customersTable)
      .where(eq(customersTable.ruc, ruc))
    return result[0]
  }

  static async create(value: CustomerInsert): Promise<{ id: Customer['id'] }> {
    const rows = await db.insert(customersTable).values(value).returning({
      id: customersTable.id,
    })
    return rows[0]
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
