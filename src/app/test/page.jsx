import { cookies } from 'next/headers'
import { createClient } from '../../lib/supabase/server'

export default async function pageTest() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	console.log(supabase)

	return (
		<div className='max-w-3xl mx-auto h-screen grid place-content-center'>
			<h1>Pepe lucho q t quierre mucho</h1>
		</div>
	)
}
