import PrinterIcon from '@/icons/printer-icon'
import { cookies } from 'next/headers'
import { createClient } from '../../lib/supabase/server'

export default async function pageTest() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	return (
		<div className='max-w-3xl mx-auto h-screen grid place-content-center'>
			<h1>Pagina para pruebas</h1>
			{/* <Icons.printer hasGradient={true} /> */}
			<PrinterIcon hasGradient />
		</div>
	)
}
