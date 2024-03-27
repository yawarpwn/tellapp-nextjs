import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default async function pageTest() {
	return (
		<div className='max-w-3xl mx-auto h-screen grid place-content-center'>
			<Dialog>
				<DialogTrigger asChild>
					<button>Abrir</button>
				</DialogTrigger>
				<DialogContent>
					Prueba
				</DialogContent>
			</Dialog>
		</div>
	)
}
