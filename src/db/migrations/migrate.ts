import postgres from 'postgres'
import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
dotenv.config({ path: '.env.local' })

const connectionString = process.env.DB_CONNECTION_STRING

if (!connectionString) {
  throw new Error('DB_CONNECTION_STRING is not defined')
}

const pushMigration = async () => {
  const migrationClient = postgres(connectionString, {
    max: 1,
  })

  const migrationDb = drizzle(migrationClient)
  await migrate(migrationDb, {
    migrationsFolder: './src/db/migrations/drizzle',
  })
  await migrationClient.end()
}

pushMigration()
