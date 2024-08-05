import { defineConfig } from 'drizzle-kit'
import { envs } from '@/config'

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  dialect: 'postgresql',
  out: './src/db/migrations/drizzle',
  dbCredentials: {
    url: envs.DB_CONNECTION_STRING,
  },
  migrations: {
    prefix: 'supabase',
  },
  verbose: true,
  strict: true,
})
