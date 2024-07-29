import { envs } from '@/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

//// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(envs.DB_CONNECTION_STRING, {
  max: 1,
  prepare: false,
})
export const db = drizzle(client)
