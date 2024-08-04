import { pgTable, timestamp, uuid, text } from 'drizzle-orm/pg-core'
import { agenciesTable } from './agencies'

export const labelsTable = pgTable('_labels', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  recipient: text('recipient').notNull(),
  destination: text('destination').notNull(),
  dniRuc: text('dni_ruc').notNull(),
  phone: text('phone'),
  address: text('address'),
  observations: text('observations'),
  agencyId: uuid('agency_id').references(() => agenciesTable.id, {
    onDelete: 'set null',
    onUpdate: 'no action',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
