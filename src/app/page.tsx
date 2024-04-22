import { LoginForm } from '@/components/login-form'
import { Logo } from '@/components/logo'
import { createServerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home(
	{ searchParams }: { searchParams?: { message?: string } },
) {
	const message = searchParams?.message || ''
	const storeCookie = cookies()
	const supabase = createServerClient(storeCookie)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/quotations')
	}

	return (
		<div className='relative bg-black'>
			<div className='absolute h-full min-h-screen w-full'>
			</div>
			<img
				width={4096}
				height={2304}
				decoding='async'
				className='absolute top-0 left-0 w-full h-full min-h-screen opacity-25 object-cover'
				loading='lazy'
				src='/collage-johneyder.avif'
			/>
			<div className='relative flex min-h-screen p-14'>
				<div className='w-full rounded-md overflow-hidden flex'>
					{/* Form */}
					<div className='min-w-full flex flex-col gap-3.5 bg-[#17171766] py-6 px-3 overflow-auto md:min-w-[calc(1rem*26.25)] backdrop-blur'>
						<header className='mb-10 '>
							<h1 className='text-center'>
								<Logo size='xl' />
							</h1>
							<h2 className='text-xs text-center text-muted-foreground'>
								Adminitra cotizaciónes, productos, clientes y más.
							</h2>
						</header>
						<LoginForm message={message} />
					</div>
					{/* Image Layer */}
					<div className='hidden relative md:inline-flex justify-end w-full '>
						<img
							width={4096}
							height={2304}
							decoding='async'
							loading='lazy'
							className='absolute top-0 left-0 w-full h-full object-cover'
							src='/johneyder-photo.avif'
						/>

						<div className='flex items-center absolute bottom-1 right-1 max-w-md px-4 gap-2 z-10 bg-background/60 rounded-md'>
							<div className=' text-sm italic'>
								<p>
									Desde que supimos que venías, nuestras vidas tomaron, rumbo,
									un horizonte, una meta, un camino.
								</p>
								<p className='mt-2'>
									Todo nuestros logros son para ti y gracias a ti🙏
								</p>
							</div>
							<div className='flex justify-center w-[150px] h-[100px] object-cover'>
								<img
									className='animate-bounce'
									loading='lazy'
									width={348}
									height={314}
									src='/johneyder-yoshi.webp'
									alt='Johneyer mi hijo montando yoshi'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
