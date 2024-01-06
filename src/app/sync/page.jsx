import agencies from '@/backup/agencies.json'
import customers from '@/backup/customers.json'
import labels from '@/backup/labels.json'
import products from '@/backup/products.json'
import quotations from '@/backup/quotations.json'
import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import fs from 'node:fs'

async function Page() {
	const storeCookies = cookies()
	const supabase = createServerClient({ cookies: () => storeCookies })
	// const quotations = supabase.from('quotations').select('*')
	// const customers = supabase.from('customers').select('*')
	// const labels = supabase.from('labels').select('*')
	// const agencies = supabase.from('agencies').select('*')
	// const products = supabase.from('products').select('*')
	//
	// const result = await Promise.all([
	//   quotations,
	//   customers,
	//   labels,
	//   agencies,
	//   products,
	// ])
	//
	// const FILENAME = {
	//   0: 'quotations',
	//   1: 'customers',
	//   2: 'labels',
	//   3: 'agencies',
	//   4: 'products',
	// }
	//
	// result.forEach(({ data }, index) => {
	//   const filename = FILENAME[index]
	//   const filePath = `./src/backup/${filename}.json`
	//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
	// })

	// supabase.from('products').insert(values)
	// await supabase.from('products').insert(products)
	// await supabase.from('customers').insert(customers)
	// await supabase.from('quotations').insert(quotations)
	// await supabase.from('labels').insert(labels)
	// await supabase.from('agencies').insert(agencies)

	return <div>page</div>
}

export default Page
