import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import type { QuotationType } from '@/types'
import {
  quotationsTable,
  customersTable,
  type InsertQuotation,
  type Quotation,
} from '@/db'

export class QuotationsModel {
  static async getAll(): Promise<QuotationType[]> {
    const result = await db
      .select({
        id: quotationsTable.id,
        number: quotationsTable.number,
        deadline: quotationsTable.deadline,
        credit: quotationsTable.credit,
        include_igv: quotationsTable.includeIgv,
        customerId: customersTable.id,
        company: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        is_regular_customer: customersTable.isRegular,
        items: quotationsTable.items,
        created_at: quotationsTable.createdAt,
        updated_at: quotationsTable.updatedAt,
      })
      .from(quotationsTable)
      .leftJoin(
        customersTable,
        eq(quotationsTable.customerId, customersTable.id),
      )
      .orderBy(desc(quotationsTable.updatedAt))
      .limit(1000)

    return result
  }

  static async getById(id: Quotation['id']): Promise<QuotationType> {
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
        customerId: customersTable.id,
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

  static async getByNumber(
    number: Quotation['number'],
  ): Promise<QuotationType> {
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
        customerId: customersTable.id,
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

  static async getLastQuotation(): Promise<{ number: number }> {
    const quotations = await db
      .select({
        number: quotationsTable.number,
      })
      .from(quotationsTable)
      .orderBy(desc(quotationsTable.number))
      .limit(1)

    return quotations[0]
  }

  static async create(
    value: InsertQuotation,
  ): Promise<{ id: Quotation['id'] }[]> {
    return await db.insert(quotationsTable).values(value).returning({
      id: quotationsTable.id,
    })
  }

  static async delete(id: Quotation['id']) {
    await db.delete(quotationsTable).where(eq(quotationsTable.id, id))
  }

  static async deleteByNumber(number: Quotation['number']) {
    await db.delete(quotationsTable).where(eq(quotationsTable.number, number))
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

    return rows[0]
  }
}
