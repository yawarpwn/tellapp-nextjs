'use client'

import React, { useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import TellLogo from './tell-logo'
import Modal from './modal'
import Input from './input'
import { getRuc, getDni } from '@/services/sunat'

const ComponenteParaImprimir = ({ componenteRef }) => {
  return (
    <div
      ref={componenteRef}
      className="shipping-label bg-white p-4 text-black border border-black h-[350px]"
    >
      <div className="flex flex-col justify-between">
        {/* Top */}
        <div className="flex items-center border-2 border-black">
          <div className="w-1/2 flex flex-row justify-center p-2 border-r-2 border-r-black">
            <TellLogo />
          </div>
          <div className="w-1/2  border-l-black p-2 ">
            <p>Señalizaciones y dispositivos de seguridad</p>
            <p className="text-center font-semibold">tellsenales.com</p>
          </div>
        </div>
        {/* Mid */}
        <div className="flex border-r-2 border-l-2 border-l-black border-r-black">
          <div className="w-1/2 border-r-2 border-r-black p-3">
            <h3 className="text-xl font-bold uppercase">Destinatario:</h3>
            <p>TELL SENALES SOCIEDAD ANONIMA CERRADA</p>
            <h3 className="text-xl font-bold uppercase">Ruc/Dni:</h3>
            <p>462264529</p>
          </div>
          <div className="w-1/2 p-3">
            <h3 className="text-xl font-bold uppercase">Destino:</h3>
            <p className="">Chaupimarca - Pasco</p>
            <h3 className="text-xl font-bold uppercase">Teléfono:</h3>
            <p>462264529</p>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-center items-center border-2 border-black p-3 ">
          <img src="/shipping-icons.svg" alt="" className="h-[58px]" />
        </div>
      </div>
    </div>
  )
}

const ComponenteDeImpresion = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [label, setLabel] = useState({
    ruc: '',
    recipient: '',
    destination: '',
  })

  console.log(label)
  const componenteRef = React.useRef(null)

  const handleImprimir = useReactToPrint({
    content: () => componenteRef.current,
  })

  const handleChange = async event => {
    const { value } = event.target
    const isRuc = value.length === 11
    const isDni = value.length === 8

    if (isDni) {
      const { company, ruc, address } = await getDni(value)
      setLabel(prev => ({
        ...prev,
        recipient: company,
      }))
    }

    if (isRuc) {
      const { ruc, company, address } = await getRuc(value)
      setLabel(prev => ({
        ...prev,
        recipient: company,
      }))
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <div>
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative w-full">
              <Input
                name="ruc"
                onChange={handleChange}
                value={label.ruc}
                labelText="Ruc"
                type="search"
              />
            </div>

            <Input
              name="recipient"
              onChange={handleChange}
              value={label.recipient}
              labelText="Destinatario"
              type="text"
            />
            <Input
              name="destination"
              required
              onChange={handleChange}
              value={label.destination}
              labelText="Destino"
              type="text"
            />

            <Input
              name="phone"
              onChange={handleChange}
              value={label.phone}
              labelText="Télefono"
              type="number"
            />

            <Input
              name="address"
              onChange={handleChange}
              value={label.address}
              labelText="Dirección"
              type="text"
            />
            <footer className="flex">
              <button className="btn btn-primary" type="submit">
                Agregar
              </button>
            </footer>
          </form>
        </Modal>
      )}
      <header className="flex items-center justify-between">
        <button className="btn btn-primary" onClick={handleImprimir}>
          Imprimir
        </button>
        <button
          onClick={() => setIsOpenModal(true)}
          className="btn btn-primary"
        >
          Crear
        </button>
      </header>
      <div className="overflow-x-auto" ref={componenteRef}>
        {[1, 2, 3].map((_, i) => {
          return <ComponenteParaImprimir key={i} />
        })}
      </div>
    </div>
  )
}

export default ComponenteDeImpresion
