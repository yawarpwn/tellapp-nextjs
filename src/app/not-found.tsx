import { TextGradient } from '@/components/text-gradient'
import Link from 'next/link'
export default function NotFoundPage() {
  return (
    <div className=" grid h-dvh w-full place-content-center">
      <div>
        <TextGradient as="h1" className="text-center text-5xl font-extrabold">
          404
        </TextGradient>
        <TextGradient as="h2" className="text-center text-3xl font-extrabold">
          Pagina no encontrada
        </TextGradient>
        <Link
          className="mt-4 block text-center text-secondary underline "
          href="/new-quos"
        >
          <span>Ir al Inicio</span>
        </Link>
      </div>
    </div>
  )
}
