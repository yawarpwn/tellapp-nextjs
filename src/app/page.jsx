import { createServerClient } from '@/lib/supabase'
import TellLogo from '@/ui/components/tell-logo'
import LoginForm from '@/ui/login-form'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
export default async function Home() {
	const storeCookie = cookies()
	const supabase = createServerClient(storeCookie)
	const { data: { session } } = await supabase.auth.getSession()

	if (session) {
		redirect('/quotations')
	}

	return (
		<>
			<main className=''>
				<div className='min-h-screen h-full flex flex-col xl:flex-row '>
					<div className='pb-16 min-h-screen pt-8 px-5 border-r border-primary/50 bg-base-200 flex flex-col items-center  flex-1 flex-shrink-0'>
						<aside className='flex flex-col w-[320px] sm:[384px]  '>
							<header className='mb-10 '>
								<h1 className='text-2xl mt-8 mb-2 lg:text-3xl '>
									Bienvenido a TellApp
								</h1>
								<h2 className='opacity-45 text-sm'>
									Identificate para continuar
								</h2>
							</header>
							<LoginForm />
							<footer className='text-sm mt-10 text-center'>
								<p>Olvidaste tu contraseña?</p>
							</footer>
						</aside>
					</div>
					<article className='min-h-screen flex items-center justify-center flex-col flex-1 flex-shrink basis-1/4 bg-secondary text-white '>
						<div className='flex flex-col gap-4 max-w-[320px] xl:max-w-xl  '>
							<div className='max-w-xl text-2xl font-mono flex flex-col gap-4'>
								<p>
									Desde que supimos que venías, nuesras vidas cambiaron tomando
									un rumbo, un camino.
								</p>
								<p>
									Le has dado sentido a nuestras vidas, llenando de amor,
									trabajo, alegría y desvelos 👶 jejeje
								</p>
								<p>Todo nuestros logros son para ti y gracias a ti🙏</p>
								<small className='text-sm italic'>
									Para nuestro hijo Johneyder
								</small>
							</div>
							<div className='flex justify-center'>
								<img
									className='w-36 h-36'
									src='/johneyder-yoshi.webp'
									alt='Johneyer mi hijo montando yoshi'
								/>
							</div>
						</div>
					</article>
				</div>
			</main>
		</>
	)
}
