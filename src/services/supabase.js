export async function updateRow({ client, table, row }) {
  console.log(':::::update row::::::', row)
  const { data, error } = await client
    .from(table)
    .update(row)
    .eq('id', row.id)
    .select()

  if (error) {
    console.warn({error, row} )
    throw new Error('error updating row: ', row)
  }
}

export async function insertRow({ client, table, row }) {
  console.log(':::::Insert Row:::::')
  const { data, error } = await client.from(table).insert(row).select().single()
  if (error) {
    console.log('error', error)
    throw new Error('error create row: ', row)
  }
}

export async function deleteRow({ id, client, table }) {
  console.log(':::::Delete Row:::::')
  const { data, error } = await client
    .from(table)
    .delete()
    .eq('id', id)
    .select()
    .single()
  if (error) {
    throw new Error('error deleting row')
  }
}
