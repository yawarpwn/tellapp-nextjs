import { TextGradient } from '@/components/ui/text-gradient'
import Link from 'next/link'
export default function NotFoundPage() {
	return (
		<div className=' w-full h-dvh grid place-content-center'>
			<div>
				<TextGradient as='h1' className='text-5xl text-center font-extrabold'>
					404
				</TextGradient>
				<TextGradient as='h2' className='text-3xl font-extrabold'>
					Pagina no encontrada
				</TextGradient>
				<Link
					className='text-secondary text-center underline block mt-4 '
					href='/quotations'
				>
					<span>
						Ir al Inicio
					</span>
				</Link>
			</div>
		</div>
	)
}
