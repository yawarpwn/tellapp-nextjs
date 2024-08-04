import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import type { AgencyInsert, Agency } from '@/schemas'
import { agenciesTable } from '@/db/schemas'
import postgres from 'postgres'
import { DatabaseResponse } from '@/types'
import { DatabaseError } from '@/errors'

export class AgenciesModel {
  static async getAll(): Promise<DatabaseResponse<Agency[]>> {
    try {
      const result = await db.select().from(agenciesTable).orderBy(desc(agenciesTable.updatedAt))

      return {
        data: result,
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener las agencias'),
      }
    }
  }

  static async getById(id: string): Promise<DatabaseResponse<Agency>> {
    try {
      const result = await db.select().from(agenciesTable).where(eq(agenciesTable.id, id))
      return {
        error: null,
        data: result[0],
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener la agencia por id'),
      }
    }
  }

  static async create(value: AgencyInsert): Promise<DatabaseResponse<Agency>> {
    try {
      const rows = await db.insert(agenciesTable).values(value).returning()

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

  static async update(
    id: Agency['id'],
    value: Partial<Omit<Agency, 'id' | 'createdAt'>>,
  ): Promise<DatabaseResponse<Agency>> {
    try {
      const result = await db
        .update(agenciesTable)
        .set(value)
        .where(eq(agenciesTable.id, id))
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

  static async delete(id: Agency['id']): Promise<DatabaseResponse<Agency>> {
    try {
      const result = await db.delete(agenciesTable).where(eq(agenciesTable.id, id)).returning()
      return {
        data: result[0],
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al eliminar el cliente'),
      }
    }
  }
}
