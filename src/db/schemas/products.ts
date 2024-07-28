import { PRODUCT_CATEGORIES } from '@/constants'
import { text, pgTable, timestamp, uuid, real } from 'drizzle-orm/pg-core'

type Categories = (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES]

export const productsTable = pgTable('_products', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  description: text('description').notNull(),
  code: text('code').unique().notNull(),
  unitSize: text('unit_size').notNull(),
  category: text('category').$type<Categories>().notNull(),
  link: text('link'),
  rank: real('rank').default(0).notNull(),
  price: real('price').notNull(), //must be 1, 2,  0.5, 5.5
  cost: real('cost').notNull(), //must be 1, 2, 0.5. 55
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
