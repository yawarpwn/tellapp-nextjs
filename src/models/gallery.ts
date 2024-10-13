import type { DatabaseResponse, Gallery, GalleryInsert, GalleryUpdate } from '@/types'
import { DatabaseError } from '@/errors'
import { db } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { galleryTable } from '@/db/schemas'
import { getThumbUrl } from '@/lib/cloudinary'

export class GalleryModel {
  static async getAll(): Promise<DatabaseResponse<Gallery[]>> {
    try {
      const rows = await db
        .select({
          id: galleryTable.id,
          title: galleryTable.title,
          publicId: galleryTable.publicId,
          category: galleryTable.category,
          url: galleryTable.url,
          width: galleryTable.width,
          height: galleryTable.height,
          format: galleryTable.format,
          createdAt: galleryTable.createdAt,
          updatedAt: galleryTable.updatedAt,
        })
        .from(galleryTable)
        .orderBy(desc(galleryTable.updatedAt))

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

  static async getById(id: string): Promise<DatabaseResponse<Gallery>> {
    try {
      const rows = await db
        .select({
          id: galleryTable.id,
          title: galleryTable.title,
          publicId: galleryTable.publicId,
          category: galleryTable.category,
          url: galleryTable.url,
          width: galleryTable.width,
          height: galleryTable.height,
          format: galleryTable.format,
          createdAt: galleryTable.createdAt,
          updatedAt: galleryTable.updatedAt,
        })
        .from(galleryTable)
        .where(eq(galleryTable.id, id))

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

  static async create(value: GalleryInsert) {
    try {
      const rows = await db.insert(galleryTable).values(value).returning()
      return {
        data: { id: rows[0].id },
        error: null,
      }
    } catch (error) {
      console.log('Error inserting gallery', error)
      return {
        data: null,
        error: new DatabaseError('Error al insertar image en Galeria'),
      }
    }
  }

  static async update(value: GalleryUpdate, id: string) {
    try {
      const rows = await db
        .update(galleryTable)
        .set({
          ...value,
          updatedAt: new Date(),
        })
        .where(eq(galleryTable.id, id))
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
      const rows = await db.delete(galleryTable).where(eq(galleryTable.id, id)).returning()
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
