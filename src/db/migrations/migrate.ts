import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db, client } from '../db'

const pushMigration = async () => {
  await migrate(db, {
    migrationsFolder: './src/db/migrations/drizzle',
  })
  await client.end()
}

pushMigration()
