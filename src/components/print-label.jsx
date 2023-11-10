'use client'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'

import { useRef } from 'react'
import TellLogo from './tell-logo'
const PrintLabel = ({ label }) => {
  const containerRef = useRef()
  const { dni_ruc, destination, recipient, phone, address, id } = label

  const print = useReactToPrint({
    content: () => containerRef.current,
  })

  const handlePrint = () => {
    print()
  }

  return (
    <>
      <header className="flex items-center justify-between mb-4">
        <Link href={`/labels/${id}/update`} className="btn">
          Editar
        </Link>
        <button onClick={handlePrint} className="btn">
          Imprimir
        </button>
      </header>
      <div className="flex items-center justify-center w-full overflow-x-auto">
        <div ref={containerRef} className='border w-full h-full'>
          {[1, 2, 3].map((_, index) => {
            return (
              <div
                key={index}
                className="shipping-label bg-white p-4 text-black border border-black h-[320px] w-[700px]"
              >
                <div className="flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex items-center border-2 border-black">
                    <div className="w-1/2 flex flex-row justify-center p-2 border-r-2 border-r-black">
                      <TellLogo />
                    </div>
                    <div className="w-1/2   p-2 ">
                      <p>Señalizaciones y dispositivos de seguridad</p>
                      <p className="text-center font-semibold">
                        tellsenales.com
                      </p>
                    </div>
                  </div>
                  {/* Mid */}
                  <div className="flex ">
                    <div className="w-1/2  p-3">
                      <h3 className="text-xl font-bold uppercase">
                        Destinatario:
                      </h3>
                      <p>{recipient}</p>
                      <h3 className="text-xl font-bold uppercase">Ruc/Dni:</h3>
                      <p>{dni_ruc}</p>
                    </div>
                    <div className="w-1/2 p-3">
                      <h3 className="text-xl font-bold uppercase">Destino:</h3>
                      <p className="">{destination}</p>
                      <h3 className="text-xl font-bold uppercase">Teléfono:</h3>
                      <p>{phone ?? ''}</p>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className="flex justify-center items-center  p-3 ">
                    <img
                      src="/shipping-icons.svg"
                      alt=""
                      className="h-[48px]"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PrintLabel
