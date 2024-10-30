import { text, pgTable, timestamp, integer, uuid, real, numeric } from 'drizzle-orm/pg-core'

export const watermarksTable = pgTable('watermark', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  url: text('url').notNull(),
  publicId: text('public_id').notNull(),
  format: text('format').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
