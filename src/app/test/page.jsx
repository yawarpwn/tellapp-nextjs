import { cookies } from 'next/headers'
import { createClient } from '../../lib/supabase/server'
import { TestForm } from './test-form'

export default async function pageTest() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	// const { data, error } = await supabase.from('customers_test').select(
	// 	'*, quotations_test(name)',
	// )
	//
	//

	const { data, error } = await supabase.from('customers_test').select(
		'id, ruc',
	).eq('ruc', '2061055556')

	return (
		<div className='max-w-3xl mx-auto h-screen grid place-content-center'>
			<h1>Pepe lucho q t quierre mucho</h1>
			<TestForm />
		</div>
	)
}
