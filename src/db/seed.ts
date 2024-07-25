import { db, client } from '../db'
import { customersTable } from './schemas/customers'
import { quotationsTable } from './schemas/quotations'
import type { QuotationType } from '@/types'
import type { CustomerType } from '@/types'

import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

const supabaseKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseKey) {
  throw new Error('Missing Supabase key')
}

const supabase = createClient(
  'https://mluiozpgwvyzpnbzfkwm.supabase.co',
  supabaseKey,
)

async function seed() {
  const { data: quotations } = await supabase
    .from('quotations')
    .select()
    .returns<QuotationType[]>()
  const { data: customers } = await supabase
    .from('customers')
    .select()
    .returns<CustomerType[]>()

  if (!customers || !quotations) return

  /*
  const regularCustomersRucs = customers
    .filter(cus => cus.is_regular)
    .map(cus => cus.ruc)

  const customersFromQuotations = {}

  for (const quo of quotations) {
    if (
      quo.ruc &&
      quo.ruc.length === 11 &&
      quo.company &&
      quo.ruc !== '15608859664' &&
      quo.company !== 'IQMEH SOCIEDAD ANONIMA CERRADA - IQMEH S.A.C.'
    ) {
      customersFromQuotations[quo.company] = {
        name: quo.company,
        ruc: quo.ruc,
        isRegular: regularCustomersRucs.includes(quo.ruc),
        address: quo.address,
        createdAt: new Date(quo.created_at),
        updatedAt: new Date(quo.created_at),
      }
    }
  }

  const arrayCustomers = Object.values(customersFromQuotations)
  await db.insert(customersTable).values(arrayCustomers)
  */

  const customersFromDb = await db.select().from(customersTable)
  const mappedQuotations = quotations.map(quo => {
    const customer = customersFromDb.find(c => c.ruc === quo.ruc)
    let customerId = null
    if (customer) {
      customerId = customer.id
    }
    return {
      id: quo.id,
      number: quo.number,
      customerId,
      deadline: quo.deadline,
      includeIgv: quo.include_igv,
      credit: quo.credit,
      items: quo.items,
      createdAt: new Date(quo.created_at),
      updatedAt: new Date(quo.updated_at),
    }
  })
  await db.insert(quotationsTable).values(mappedQuotations)
  // console.log(Object.values(customersFromQuotations))
  // const copies = arrayCustomers.filter(c => c.ruc === '20501580474')
  // console.log(copies)
}
seed()
