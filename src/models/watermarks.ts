import type { DatabaseResponse, Watermark, WatermarkUpdate, WatermarkInsert } from '@/types'
import { DatabaseError } from '@/errors'
import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { watermarksTable } from '@/db/schemas'
import { getThumbUrl } from '@/lib/cloudinary'

export class WatermarkModel {
  static async getAll(): Promise<DatabaseResponse<Watermark[]>> {
    try {
      const rows = await db
        .select({
          id: watermarksTable.id,
          publicId: watermarksTable.publicId,
          url: watermarksTable.url,
          width: watermarksTable.width,
          height: watermarksTable.height,
          format: watermarksTable.format,
          createdAt: watermarksTable.createdAt,
          updatedAt: watermarksTable.updatedAt,
        })
        .from(watermarksTable)
        .orderBy(desc(watermarksTable.updatedAt))
        .limit(200)

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

  static async getById(id: string): Promise<DatabaseResponse<Watermark>> {
    try {
      const rows = await db
        .select({
          id: watermarksTable.id,
          publicId: watermarksTable.publicId,
          url: watermarksTable.url,
          width: watermarksTable.width,
          height: watermarksTable.height,
          format: watermarksTable.format,
          createdAt: watermarksTable.createdAt,
          updatedAt: watermarksTable.updatedAt,
        })
        .from(watermarksTable)
        .where(eq(watermarksTable.id, id))

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

  static async create(value: WatermarkInsert) {
    try {
      const rows = await db.insert(watermarksTable).values(value).returning()
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

  static async update(value: WatermarkUpdate, id: string) {
    try {
      const rows = await db
        .update(watermarksTable)
        .set({
          ...value,
          updatedAt: new Date(),
        })
        .where(eq(watermarksTable.id, id))
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
      const rows = await db.delete(watermarksTable).where(eq(watermarksTable.id, id)).returning()
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
