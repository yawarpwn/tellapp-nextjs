'use client'

import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/lib/actions/auth'
import { useFormState } from 'react-dom'

export function LoginForm({ message }: { message: string }) {
  const [state, dispatch] = useFormState(signIn, { message: '', errors: {} })

  return (
    <>
      <form action={dispatch}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-4">
            <Label htmlFor="email" className="label">
              Correo
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              className=""
              placeholder="correo@dominio.com"
              required
            />
            {state?.errors?.email && (
              <p className="text-xs text-destructive">
                {state?.errors?.email[0]}
              </p>
            )}
          </div>
          <div className="grid gap-4">
            <Label htmlFor="password" className="label">
              <span className="label-text">Constraseña</span>
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="********"
              required
            />

            {state?.errors?.password && (
              <p className=" text-xs text-destructive">
                {state?.errors?.password[0]}
              </p>
            )}
            {state?.message && (
              <p className=" text-xs text-destructive">*{state.message}</p>
            )}
            <p className="text-xs text-[#6b66ff]">
              <a href="#">Olvidates tu contraseña ?</a>
            </p>
          </div>
          <SubmitButton />
          <p className="text-center text-xs">
            Necesitas una cuenta?{' '}
            <a href="#" className="text-[#6b66ff] ">
              Registrate
            </a>
          </p>
          {message && (
            <div className="rounded-sm border border-destructive p-2 text-destructive">
              <p className="text-center text-xs">{message}</p>
            </div>
          )}
        </div>
      </form>
    </>
  )
}
