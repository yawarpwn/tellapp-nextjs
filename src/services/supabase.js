export async function updateRow({ client, table, row }) {
  console.log('update row:::::::')
  const { data, error } = await client
    .from(table)
    .update(row)
    .eq('id', row.id)
    .select()

  if (error) {
    console.log('error', error)
    throw new Error('error create quotation')
  }

  console.log('update row', data)
}

export async function insertRow({ client, table, row }) {
  const { data, error } = await client.from(table).insert(row).select().single()

  if (error) {
    console.log('error', error)
    throw new Error('error create quotation')
  }

  console.log('create row', data)
}
