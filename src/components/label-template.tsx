import { ShippingIcon } from '@/icons/shipping-icons'
import { LabelType } from '@/types'
import React from 'react'
import TellLogo from './tell-logo'
import './label-print.css'

interface Props {
  label: LabelType
}

export const LabelTemplate = React.forwardRef<HTMLDivElement, Props>(({ label }, ref) => {
  const { recipient, dni_ruc, destination, phone, agencies, address } = label
  return (
    <div ref={ref} className="grid h-full grid-rows-3 text-black">
      {[1, 2, 3].map((_, index) => (
        <article
          key={index}
          className="flex h-full flex-col justify-between gap-4 border-b border-dashed bg-white p-4 last:border-none"
        >
          {/* Top */}
          <header className="flex items-center border-2 border-black">
            <div className="flex w-1/2 flex-row justify-center">
              <TellLogo compact={false} />
            </div>
            <div className="">
              <p>Señalizaciones y dispositivos de seguridad</p>
              <p className="text-center font-semibold">tellsenales.com</p>
            </div>
          </header>
          {/* Mid */}
          <section className="grid grid-cols-2 ">
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xl font-bold uppercase">Destinatario:</p>
                <p>{recipient}</p>
              </div>
              <div>
                <p className="text-xl font-bold uppercase">Ruc/Dni:</p>
                <p>{dni_ruc}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xl font-bold uppercase">Destino:</p>
                <div>
                  <p className="uppercase">{destination}</p>
                  {address && <p className="m-0 text-sm">{address}</p>}
                </div>
              </div>
              <div>
                <p className="text-xl font-bold uppercase">Teléfono:</p>
                <p>{phone}</p>
              </div>
            </div>
          </section>
          <section>
            <p>
              <strong>Agencia Sugerida:</strong>
              <span className="ml-2">{agencies?.company}</span>
            </p>
            <p>
              <strong>Dirección:</strong>
              <span className="ml-2">{agencies?.address}</span>
            </p>
          </section>
          {/* Bottom */}
          <footer className="flex items-center justify-center">
            <ShippingIcon className="h-14" />
          </footer>
        </article>
      ))}
    </div>
  )
})
LabelTemplate.displayName = 'LabelTemplate'
