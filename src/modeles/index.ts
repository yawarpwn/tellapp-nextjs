import { db } from '@/db'
import { eq } from 'drizzle-orm'
import {
  quotationsTable,
  customersTable,
  type InsertQuotation,
  type Quotation,
} from '@/db'

export class Quotations {
  async getAll() {
    const result = await db
      .select({
        id: quotationsTable.id,
        number: quotationsTable.number,
        deadline: quotationsTable.deadline,
        items: quotationsTable.items,
        credit: quotationsTable.credit,
        include_igv: quotationsTable.includeIgv,
        company: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        is_regular: customersTable.isRegular,
        created_at: quotationsTable.createdAt,
        updated_at: quotationsTable.updatedAt,
      })
      .from(quotationsTable)
      .leftJoin(
        customersTable,
        eq(quotationsTable.customerId, customersTable.id),
      )

    return result
  }

  async getById(id: Quotation['id']) {
    const result = await db
      .select({
        id: quotationsTable.id,
        number: quotationsTable.number,
        deadline: quotationsTable.deadline,
        items: quotationsTable.items,
        credit: quotationsTable.credit,
        include_igv: quotationsTable.includeIgv,
        company: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        is_regular: customersTable.isRegular,
        created_at: quotationsTable.createdAt,
        updated_at: quotationsTable.updatedAt,
      })
      .from(quotationsTable)
      .where(eq(quotationsTable.id, id))
      .leftJoin(
        customersTable,
        eq(quotationsTable.customerId, customersTable.id),
      )

    return result[0]
  }

  async create(value: InsertQuotation) {
    await db.insert(quotationsTable).values(value)
  }

  async delete(id: Quotation['id']) {
    await db.delete(quotationsTable).where(eq(quotationsTable.id, id))
  }

  async update(
    id: Quotation['id'],
    value: Partial<Omit<Quotation, 'id' | 'createdAt'>>,
  ) {
    await db
      .update(quotationsTable)
      .set(value)
      .where(eq(quotationsTable.id, id))
  }
}
