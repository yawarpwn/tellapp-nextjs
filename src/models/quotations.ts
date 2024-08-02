import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { quotationsTable, customersTable } from '@/db/schemas'

export class QuotationsModel {
  static async getAll() {
    try {
      const result = await db
        .select({
          id: quotationsTable.id,
          number: quotationsTable.number,
          deadline: quotationsTable.deadline,
          credit: quotationsTable.credit,
          includeIgv: quotationsTable.includeIgv,
          customerId: customersTable.id,
          company: customersTable.name,
          ruc: customersTable.ruc,
          address: customersTable.address,
          isRegularCustomer: customersTable.isRegular,
          items: quotationsTable.items,
          createdAt: quotationsTable.createdAt,
          updatedAt: quotationsTable.updatedAt,
        })
        .from(quotationsTable)
        .leftJoin(
          customersTable,
          eq(quotationsTable.customerId, customersTable.id),
        )
        .orderBy(desc(quotationsTable.updatedAt))
        .limit(1000)

      console.log('all quotations success')
      return result
    } catch (error) {
      console.log(error)
    }
  }

  static async getById(id: string) {
    const result = await db
      .select({
        id: quotationsTable.id,
        number: quotationsTable.number,
        deadline: quotationsTable.deadline,
        items: quotationsTable.items,
        credit: quotationsTable.credit,
        includeIgv: quotationsTable.includeIgv,
        company: customersTable.name,
        ruc: customersTable.ruc,
        address: customersTable.address,
        customerId: customersTable.id,
        isCustomer: customersTable.isRegular,
        createdAt: quotationsTable.createdAt,
        updatedAt: quotationsTable.updatedAt,
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
        includeIgv: quotationsTable.includeIgv,
        company: customersTable.name,
        ruc: customersTable.ruc,
        customerId: customersTable.id,
        address: customersTable.address,
        isRegularCustomer: customersTable.isRegular,
        createdAt: quotationsTable.createdAt,
        updatedAt: quotationsTable.updatedAt,
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

  static async create(value: InsertQuotation) {
    try {
      const result = await db.insert(quotationsTable).values(value).returning({
        id: quotationsTable.id,
        number: quotationsTable.number,
      })

      return {
        success: true,
        data: result[0],
        message: 'Cotizacion Creada',
      }
    } catch (error) {
      console.log(error)
      return {
        sucess: false,
        data: null,
        message: 'Error creando cotizacion',
      }
    }
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
    try {
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
          includeIgv: quotationsTable.includeIgv,
          created_at: quotationsTable.createdAt,
          updated_at: quotationsTable.updatedAt,
        })

      return {
        success: true,
        data: rows[0],
        message: `Cotizacion actualizada correctamente`,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error actualizando cotizacion',
      }
    }
  }
}
