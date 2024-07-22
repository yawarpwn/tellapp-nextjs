import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const connectString = process.env.DB_CONNECTION_STRING
if (!connectString) {
  throw new Error('DB_CONNECTION_STRING is not defined')
}

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  dialect: 'postgresql',
  out: './src/db/migrations/drizzle',
  dbCredentials: {
    url: connectString,
  },
  migrations: {
    prefix: 'supabase',
  },
  verbose: true,
  strict: true,
})
