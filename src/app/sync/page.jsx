import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'
const encontrarObjetoRepetido = (array) => {
    const contador = {};

    for (const obj of array) {
        const quoNumber = obj.quo_number;
        contador[quoNumber] = (contador[quoNumber] || 0) + 1;
    }

    const objetoRepetido = array.find(obj => contador[obj.quo_number] > 1);
    return objetoRepetido || null;
};
const encontrarObjetosRepetidos = (array) => {
    const contador = {};
    const objetosRepetidos = [];

    // Iteramos sobre el array de objetos y contamos las repeticiones de quo_number
    array.forEach(obj => {
        const quoNumber = obj.quo_number;
        contador[quoNumber] = (contador[quoNumber] || 0) + 1;
    });

    // Iteramos nuevamente sobre el array para encontrar objetos con quo_number repetidos
    array.forEach(obj => {
        const quoNumber = obj.quo_number;
        if (contador[quoNumber] > 1 && !objetosRepetidos.some(repetido => repetido.quo_number === quoNumber)) {
            objetosRepetidos.push(obj);
        }
    });

    return objetosRepetidos;
};

async function Page() {
  const storeCookies = cookies()
  const supabase = createServerComponentClient({ cookies: () => storeCookies})
  await supabase.from('cotizaciones').delete().eq('id',  1440)
  const { data, error } = await supabase.from('cotizaciones').select('*')

  // const safeQuos = data.filter(q => q.viability === 'Safe')
  // const quos = new Set(safeQuos.map(q => q.ruc))
  // const customersUnique = [...quos].map(ruc => {
  //   return data.find(quo => quo.ruc === ruc)
  // }) 

  // const objetoRepetido = encontrarObjetoRepetido(data)
  // console.log(objetoRepetido)
  // const objetosRepetidos = encontrarObjetosRepetidos(data)
  // console.log(objetosRepetidos)

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

    const quotations = data.map(item => {
    const { created_at, company, address, quo_number, ruc, deadline, quotation_items} = item
    return {
      number: quo_number,
      created_at: created_at,
      company,
      address: address ?? '',
      ruc,
      deadline,
      items: quotation_items 
    }
  })

  const results = await supabase.from('quotations').insert(quotations).select()
  console.log(results)


  return (
    <div>page</div>
  )
}

export default Page
