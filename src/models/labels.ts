import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import type { LabelInsert, Label } from '@/types'
import { agenciesTable, labelsTable } from '@/db/schemas'
import { DatabaseResponse } from '@/types'
import { DatabaseError } from '@/errors'

export class LabelsModel {
  static async getAll(): Promise<DatabaseResponse<Label[]>> {
    try {
      const result = await db
        .select({
          id: labelsTable.id,
          recipient: labelsTable.recipient,
          destination: labelsTable.destination,
          address: labelsTable.address,
          dniRuc: labelsTable.dniRuc,
          phone: labelsTable.phone,
          observations: labelsTable.observations,
          agencyId: labelsTable.agencyId,
          updatedAt: labelsTable.updatedAt,
          createdAt: labelsTable.createdAt,
          agency: {
            name: agenciesTable.name,
            address: agenciesTable.address,
            phone: agenciesTable.phone,
            ruc: agenciesTable.ruc,
          },
        })
        .from(labelsTable)
        .leftJoin(agenciesTable, eq(labelsTable.agencyId, agenciesTable.id))
        .orderBy(desc(labelsTable.updatedAt))
        .limit(200)

      return {
        data: result,
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error al obtener las rotulos'),
      }
    }
  }

  static async create(value: LabelInsert): Promise<DatabaseResponse<{ id: string }>> {
    try {
      const rows = await db.insert(labelsTable).values(value).returning({
        id: labelsTable.id,
      })

      return {
        error: null,
        data: rows[0],
      }
    } catch (error) {
      return {
        data: null,
        error: DatabaseError.internalError('Error al crear el cliente'),
      }
    }
  }

  static async update(
    id: string,
    value: Partial<Omit<Label, 'id' | 'createdAt'>>,
  ): Promise<DatabaseResponse<{ id: string }>> {
    try {
      const result = await db
        .update(labelsTable)
        .set(value)
        .where(eq(labelsTable.id, id))
        .returning({ id: labelsTable.id })
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

  static async delete(id: Label['id']): Promise<DatabaseResponse<{ id: string }>> {
    try {
      const result = await db
        .delete(labelsTable)
        .where(eq(labelsTable.id, id))
        .returning({ id: labelsTable.id })
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
