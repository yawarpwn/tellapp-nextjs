import { text, pgTable, timestamp, integer, uuid, real, numeric } from 'drizzle-orm/pg-core'
import { SignalCategory } from '@/types'

export const signalsTable = pgTable('signals', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  title: text('title').notNull(),
  code: text('code').notNull(),
  category: text('category').$type<SignalCategory>().notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  url: text('url').notNull(),
  publicId: text('public_id').notNull(),
  format: text('format').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
