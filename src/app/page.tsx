import { LoginForm } from '@/components/login-form'
import { Logo } from '@/components/logo'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home({
  searchParams,
}: {
  searchParams?: { message?: string }
}) {
  const message = searchParams?.message || ''

  const authToken = cookies().get('auth-token')

  if (authToken) redirect('/new-quos')

  return (
    <div className="relative bg-black">
      <div className="absolute h-full min-h-screen w-full"></div>
      <img
        width={4096}
        height={2304}
        decoding="async"
        className="absolute left-0 top-0 h-full min-h-screen w-full object-cover opacity-25"
        loading="lazy"
        src="/collage-johneyder.avif"
      />
      <div className="relative flex min-h-screen p-14">
        <div className="flex w-full overflow-hidden rounded-md">
          {/* Form */}
          <div className="flex min-w-full flex-col gap-3.5 overflow-auto bg-[#17171766] px-3 py-6 backdrop-blur md:min-w-[calc(1rem*26.25)]">
            <header className="mb-10 ">
              <h1 className="text-center">
                <Logo size="xl" />
              </h1>
              <h2 className="text-center text-xs text-muted-foreground">
                Adminitra cotizaciónes, productos, clientes y más.
              </h2>
            </header>
            <LoginForm message={message} />
          </div>
          {/* Image Layer */}
          <div className="relative hidden w-full justify-end md:inline-flex ">
            <img
              width={4096}
              height={2304}
              decoding="async"
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full object-cover"
              src="/johneyder-photo.avif"
            />

            <div className="absolute bottom-1 right-1 z-10 flex max-w-md items-center gap-2 rounded-md bg-background/60 px-4">
              <div className=" text-sm italic">
                <p>
                  Desde que supimos que venías, nuestras vidas tomaron, rumbo,
                  un horizonte, una meta, un camino.
                </p>
                <p className="mt-2">
                  Todo nuestros logros son para ti y gracias a ti🙏
                </p>
              </div>
              <div className="flex h-[100px] w-[150px] justify-center object-cover">
                <img
                  className="animate-bounce"
                  loading="lazy"
                  width={348}
                  height={314}
                  src="/johneyder-yoshi.webp"
                  alt="Johneyer mi hijo montando yoshi"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
