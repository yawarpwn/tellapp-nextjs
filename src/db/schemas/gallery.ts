import { text, pgTable, timestamp, integer, uuid, real, numeric } from 'drizzle-orm/pg-core'
import { GalleryCategory } from '@/types'

export const galleryTable = pgTable('gallery', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  title: text('title').notNull(),
  category: text('category').$type<GalleryCategory>().notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  url: text('url').notNull(),
  publicId: text('public_id').notNull(),
  format: text('format').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
