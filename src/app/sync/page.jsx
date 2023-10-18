import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'

async function Page() {
  const storeCookies = cookies()
  const supabase = createServerComponentClient({ cookies: () => storeCookies})
  const { data, error } = await supabase.from('cotizaciones').select('*')
  // const safeQuos = data.filter(q => q.viability === 'Safe')
  // const quos = new Set(safeQuos.map(q => q.ruc))
  // const customersUnique = [...quos].map(ruc => {
  //   return data.find(quo => quo.ruc === ruc)
  // }) 

  // customersUnique.forEach(async quo => {
  //   const customToInsert = {
  //     name: quo.company,
  //     address: quo.address,
  //     ruc: quo.ruc,
  //     phone: quo.phone,
  //     email: quo.email
  //   }
  //   await supabase.from('customers').insert(customToInsert)
  // })

  //   const quotations = data.map(item => {
  //   const { created_at, company, address, quo_number, ruc, deadline, quotation_items} = item
  //   return {
  //     created_at: created_at,
  //     company,
  //     address: address ?? '',
  //     ruc,
  //     deadline,
  //     items: quotation_items 
  //   }
  // })

  // const results = await supabase.from('quotations').insert(quotations).select()
  // console.log(results)


  return (
    <div>page</div>
  )
}

export default Page
