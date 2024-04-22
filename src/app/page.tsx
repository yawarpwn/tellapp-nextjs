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
// return (
//   <>
//     <main className=''>
//       <div className='flex flex-col lg:flex-row bg-indigo-500'>
//         <div className='flex min-h-screen md:flex-1 md:flex-shrink-0 flex-col justify-center items-center p-14 border '>
//           <aside className='flex-col w-full h-full bg-background p-4 rounded-md'>
//             <header className='mb-10 '>
//               <h1 className='mb-2 mt-8 text-2xl lg:text-3xl '>
//                 <span>
//                   Bienvenido a&nbsp;
//                 </span>
//                 <Logo />
//               </h1>
//               <h2 className='text-sm opacity-45'>
//                 Adminitra cotizaciónes, clientes y más.
//               </h2>
//             </header>
//             <LoginForm message={message} />
//             <footer className='mt-10 text-center text-sm'>
//               <a href='#'>Olvidaste tu contraseña?</a>
//             </footer>
//           </aside>
//         </div>
//         <article className='flex min-h-screen flex-1 flex-shrink basis-1/4 flex-col items-center justify-center bg-purple-500 text-white '>
//           <div className='flex max-w-md px-4 flex-col gap-4'>
//             <div className='flex max-w-xl flex-col gap-4 font-mono text-2xl text-pretty'>
//               <p>
//                 Desde que supimos que venías, nuestras vidas tomaron, rumbo,
//                 un horizonte, una meta, un camino🌈.
//               </p>
//               <p>
//                 Ahora esta lleno de amor, paciencia, alegria , optimismo,
//                 trabajo, compromiso y desvelos 👶 jejeje
//               </p>
//               <p>Todo nuestros logros son para ti y gracias a ti🙏</p>
//               <small className='text-sm italic'>
//                 Para nuestro hijo Johneyder
//               </small>
//             </div>
//             <div className='flex justify-center mt-4'>
//               <img
//                 className='h-36 w-36 animate-bounce'
//                 src='/johneyder-yoshi.webp'
//                 alt='Johneyer mi hijo montando yoshi'
//               />
//             </div>
//           </div>
//         </article>
//       </div>
//     </main>
//   </>
// )
