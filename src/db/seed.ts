import { db, client } from '../db'
import customersJson from '../../backup/customers.json'
import quotationsJson from '../../backup/quotations.json'
import { customers } from './schemas/customers'
import { quotations } from './schemas/quotations'
const quo = quotationsJson[3]

async function seed() {
  //seed customers
  // const mappedCustomers = customersJson.map(customer => ({
  //   id: customer.id,
  //   name: customer.name,
  //   ruc: customer.ruc,
  //   address: customer.address,
  //   isRegular: customer.is_regular,
  //   createdAt: new Date(customer.created_at),
  //   updatedAt: new Date(customer.updated_at),
  // }))
  // await db.insert(customers).values(mappedCustomers)

  //seed quotations
  const mappedQuotations = quotationsJson.map(quo => {
    const customer = customersJson.find(c => c.ruc === quo.ruc)

    return {
      id: quo.id,
      number: quo.number,
      deadline: quo.deadline,
      credit: quo.credit,
      items: quo.items,
      customerId: customer?.id,
      includeIgv: quo.include_igv,
      createdAt: new Date(quo.created_at),
      updatedAt: new Date(quo.updated_at),
    }
  })
  await db.insert(quotations).values(mappedQuotations)

  //   console.log(quo)
  //   await db.insert(quotations).values({
  //     id: quo.id,
  //     number: quo.number,
  //     deadline: quo.deadline,
  //     credit: quo.credit,
  //     items: quo.items,
  //     customerId: quo.customer_id,
  //     includeIgv: quo.include_igv,
  //     createdAt: new Date(quo.created_at),
  //     updatedAt: new Date(quo.updated_at ?? quo.created_at),
  //   })
  //   console.log('insert')
  client.end()
}

// const id = 'd85ae9de-d33e-4fae-9106-fff37454f739'
// console.log(customersJson.find(c => c.ruc === '10100808272'))
seed()
