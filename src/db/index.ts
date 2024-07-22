import 'dotenv/config'
import { envs } from '@/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(process.env.DB_CONNECTION_STRING as string, {})
export const db = drizzle(client)

console.log(db.select().from('quotations'))
