import { TABLES } from '../src/constants'
import { supabase } from './client'
import quotationsJson from '../backup/quotations.json'
import customersJson from '../backup/customers.json'

async function main() {
  const { data, error } = await supabase
    .from('quotations_duplicate')
    .select(
      `
*,
customer:customers(*) -> name,

`,
    )
    .limit(500)

  console.log(data)
}

// async function main() {
//   const customersRucs = customersJson.map(c => c.ruc)
//
//   console.log(customersRucs)
//
//   const customers = new Set()
//
//   for (const quotation of quotationsJson) {
//     if (
//       quotation.ruc &&
//       quotation.ruc.length === 11 &&
//       !customersRucs.includes(quotation.ruc)
//     ) {
//       customers.add({
//         ruc: quotation.ruc,
//         name: quotation.company,
//         address: quotation.address,
//       })
//     }
//   }
//
//   const { data, error } = await supabase
//     .from('custoemrs')
//     .insert(Array.from(customers))
//
//   console.log('insert all customers')
// }
// async function main() {
//   const quotations = quotationsJson.map(quo => {
//     const customer = customersJson.find(c => c.ruc === quo.ruc)
//
//     return {
//       id: quo.id,
//       number: quo.number,
//       deadline: quo.deadline,
//       items: quo.items,
//       include_igv: quo.include_igv,
//       credit: quo.credit,
//       customer_id: customer?.id,
//       created_at: quo.created_at,
//       updated_at: customer?.updated_at ?? quo.created_at,
//     }
//   })
//   const { data, error } = await supabase
//     .from('quotations_duplicate_duplicate')
//     .insert(quotations)
//
//   if (error) throw error
//   console.log('inserted quotations')
// }

main()
  .then(() => console.log('Success Script'))
  .catch(console.error)
