import { db } from '@/db'
import { eq, asc, desc } from 'drizzle-orm'
import {
  quotationsTable,
  customersTable,
  type InsertQuotation,
  type Quotation,
} from '@/db'

export class Quotations {
  static async getAll() {
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
        is_regular_customer: customersTable.isRegular,
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

  static async getById(id: Quotation['id']) {
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
        is_regular_customer: customersTable.isRegular,
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

  static async getByNumber(number: Quotation['number']) {
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
        is_regular_customer: customersTable.isRegular,
        created_at: quotationsTable.createdAt,
        updated_at: quotationsTable.updatedAt,
      })
      .from(quotationsTable)
      .where(eq(quotationsTable.number, number))
      .leftJoin(
        customersTable,
        eq(quotationsTable.customerId, customersTable.id),
      )

    return result[0]
  }

  static async getLastQuotation() {
    const quotations = await db
      .select({
        number: quotationsTable.number,
      })
      .from(quotationsTable)
      .orderBy(desc(quotationsTable.number))
      .limit(1)

    return quotations[0]
  }

  static async create(value: InsertQuotation) {
    await db.insert(quotationsTable).values(value)
  }

  static async delete(id: Quotation['id']) {
    await db.delete(quotationsTable).where(eq(quotationsTable.id, id))
  }

  static async update(
    id: Quotation['id'],
    value: Partial<Omit<Quotation, 'id' | 'createdAt'>>,
  ) {
    const rows = await db
      .update(quotationsTable)
      .set(value)
      .where(eq(quotationsTable.id, id))
      .returning({
        id: quotationsTable.id,
        number: quotationsTable.number,
        deadline: quotationsTable.deadline,
        items: quotationsTable.items,
        credit: quotationsTable.credit,
        customerId: quotationsTable.customerId,
        include_igv: quotationsTable.includeIgv,
        created_at: quotationsTable.createdAt,
        updated_at: quotationsTable.updatedAt,
      })

    return rows
  }
}
