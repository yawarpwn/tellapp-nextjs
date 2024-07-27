import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
const connectionString = process.env.DB_CONNECTION_STRING

if (!connectionString) {
  throw new Error('DB_CONNECTION_STRING is not defined')
}

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

//// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client)
