import type { DatabaseResponse, Signal, SignalUpdate, SignalInsert } from '@/types'
import { DatabaseError } from '@/errors'
import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { signalsTable } from '@/db/schemas'
import { getThumbUrl } from '@/lib/cloudinary'

export class SignalsModel {
  static async getAll(): Promise<DatabaseResponse<Signal[]>> {
    try {
      const rows = await db
        .select({
          id: signalsTable.id,
          title: signalsTable.title,
          code: signalsTable.code,
          publicId: signalsTable.publicId,
          category: signalsTable.category,
          url: signalsTable.url,
          width: signalsTable.width,
          height: signalsTable.height,
          format: signalsTable.format,
          createdAt: signalsTable.createdAt,
          updatedAt: signalsTable.updatedAt,
          description: signalsTable.description,
        })
        .from(signalsTable)
        .orderBy(desc(signalsTable.updatedAt))

      const mappedRows = rows.map(row => ({
        ...row,
        thumbUrl: getThumbUrl(row.publicId),
      }))

      return {
        data: mappedRows,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: new DatabaseError('Error al obtener Galeria'),
      }
    }
  }

  static async getById(id: string): Promise<DatabaseResponse<Signal>> {
    try {
      const rows = await db
        .select({
          id: signalsTable.id,
          title: signalsTable.title,
          code: signalsTable.code,
          publicId: signalsTable.publicId,
          category: signalsTable.category,
          url: signalsTable.url,
          width: signalsTable.width,
          height: signalsTable.height,
          format: signalsTable.format,
          createdAt: signalsTable.createdAt,
          updatedAt: signalsTable.updatedAt,
          description: signalsTable.description,
        })
        .from(signalsTable)
        .where(eq(signalsTable.id, id))

      const mappedRows = rows.map(row => ({
        ...row,
        thumbUrl: getThumbUrl(row.publicId),
      }))

      return {
        data: mappedRows[0],
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: new DatabaseError('Error al obtener photo in Galeria by ID'),
      }
    }
  }

  static async create(value: SignalInsert) {
    try {
      const rows = await db.insert(signalsTable).values(value).returning()
      return {
        data: { id: rows[0].id },
        error: null,
      }
    } catch (error) {
      console.log('Error inserting signal', error)
      return {
        data: null,
        error: new DatabaseError('Error al insertar image en signal'),
      }
    }
  }

  static async update(value: SignalUpdate, id: string) {
    try {
      const rows = await db
        .update(signalsTable)
        .set({
          ...value,
          updatedAt: new Date(),
        })
        .where(eq(signalsTable.id, id))
        .returning()
      return {
        data: { id: rows[0].id },
        error: null,
      }
    } catch (error) {
      console.log('Error updating gallery', error)
      return {
        data: null,
        error: new DatabaseError('Error al al actualizar image en Galeria'),
      }
    }
  }

  static async delete(id: string) {
    try {
      const rows = await db.delete(signalsTable).where(eq(signalsTable.id, id)).returning()
      return {
        data: {
          id: rows[0].id,
        },
        error: null,
      }
    } catch (error) {
      console.log(error)
      return {
        data: null,
        error: DatabaseError.internalError('Error deleting image from Gallery'),
      }
    }
  }
}
