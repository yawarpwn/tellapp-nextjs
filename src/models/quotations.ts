import type { DatabaseResponse } from '@/types'
import { DatabaseError } from '@/errors'
import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import {
  quotationsTable,
  customersTable,
  Quotation,
  InsertQuotation,
} from '@/db/schemas'
export class QuotationsModel {
  /**
   * Obtener todas las cotizaciones
   */
  static async getAll(): Promise<DatabaseResponse<Quotation[]>> {
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
          isPaymentPending: quotationsTable.isPaymentPending,
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

      return {
        data: result,
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener las cotizaciones'),
      }
    }
  }

  static async getById(id: string) {
    try {
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
          isPaymentPending: quotationsTable.isPaymentPending,
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
    } catch (error) {
      console.log(error)
    }
  }

  static async getByNumber(
    number: number,
  ): Promise<DatabaseResponse<Quotation>> {
    try {
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
          isPaymentPending: quotationsTable.isPaymentPending,
          createdAt: quotationsTable.createdAt,
          updatedAt: quotationsTable.updatedAt,
        })
        .from(quotationsTable)
        .where(eq(quotationsTable.number, number))
        .leftJoin(
          customersTable,
          eq(quotationsTable.customerId, customersTable.id),
        )

      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener las cotizacion'),
      }
    }
  }

  static async getLastQuotation(): Promise<
    DatabaseResponse<{ number: number }>
  > {
    try {
      const quotations = await db
        .select({
          number: quotationsTable.number,
        })
        .from(quotationsTable)
        .orderBy(desc(quotationsTable.number))
        .limit(1)

      return {
        error: null,
        data: {
          number: quotations[0].number,
        },
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener las cotizaciones'),
      }
    }
  }

  static async create(
    value: InsertQuotation,
  ): Promise<DatabaseResponse<{ id: string; number: number }>> {
    try {
      const result = await db.insert(quotationsTable).values(value).returning({
        id: quotationsTable.id,
        number: quotationsTable.number,
      })

      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al crear la cotización'),
      }
    }
  }

  static async delete(
    id: Quotation['id'],
  ): Promise<DatabaseResponse<{ number: number }>> {
    try {
      const result = await db
        .delete(quotationsTable)
        .where(eq(quotationsTable.id, id))
        .returning({
          number: quotationsTable.number,
        })
      return {
        data: { number: result[0].number },
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: DatabaseError.internalError('Error al eliminar la cotización'),
      }
    }
  }

  static async deleteByNumber(number: Quotation['number']) {
    await db.delete(quotationsTable).where(eq(quotationsTable.number, number))
  }

  static async update(
    id: string,
    value: Partial<Omit<Quotation, 'id' | 'createdAt'>>,
  ): Promise<DatabaseResponse<Quotation>> {
    try {
      const rows = await db
        .update(quotationsTable)
        .set(value)
        .where(eq(quotationsTable.id, id))
        .returning()

      return {
        error: null,
        data: rows[0],
      }
    } catch (error) {
      return {
        data: null,
        error: DatabaseError.internalError('Error al actualizar la cotización'),
      }
    }
  }

  static async setIsPaymentPending(
    id: string,
    value: boolean,
  ): Promise<
    DatabaseResponse<{
      number: number
    }>
  > {
    try {
      const result = await db
        .update(quotationsTable)
        .set({ isPaymentPending: value })
        .where(eq(quotationsTable.id, id))
        .returning({ number: quotationsTable.number })
      return {
        error: null,
        data: result[0],
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al actualizar la cotización'),
      }
    }
  }
}
