import { TABLES } from '../src/constants'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { supabase } from './client'

async function backup(table: (typeof TABLES)[keyof typeof TABLES]) {
  const { data, error } = await supabase.from(table).select('*')

  if (error) throw error

  //check if folder exists
  if (!existsSync('./backup')) {
    await fs.mkdir('./backup')
  }

  fs.writeFile(`./backup/${table}.json`, JSON.stringify(data))
  console.log(`Success Backup TABLE:${table}`)
}

async function main() {
  await backup(TABLES.Quotations)
  await backup(TABLES.Customers)
  await backup(TABLES.Products)
  await backup(TABLES.Labels)
  await backup(TABLES.Agencies)
  await backup(TABLES.Gallery)
  await backup(TABLES.Signals)
}

main().catch(err => console.log(err))
