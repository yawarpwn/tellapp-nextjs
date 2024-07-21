import { TABLES } from '../src/constants'
import { supabase } from './client'
import quotationsJson from '../backup/quotations.json'
import customersJson from '../backup/customers.json'

async function main() {
  const { data, error } = await supabase
    .from('quotations')
    .select('*')
    .order('number', { ascending: false })
  // const quotations = quotationsJson.map(quo => {
  //   const customer = customersJson.find(c => c.ruc === quo.ruc)
  //
  //   return {
  //     id: quo.id,
  //     number: quo.number,
  //     deadline: quo.deadline,
  //     items: quo.items,
  //     include_igv: quo.include_igv,
  //     credit: quo.credit,
  //     customer_id: customer?.id,
  //     created_at: customer?.created_at ?? new Date().toISOString(),
  //     updated_at: customer?.updated_at,
  //   }
  // })
  // const { data, error } = await supabase
  //   .from('quotations_duplicate')
  //   .insert(quotations)
  //
  // if (error) throw error
  // console.log('inserted quotations')
}

main()
  .then(() => console.log('Success Script'))
  .catch(console.error)
