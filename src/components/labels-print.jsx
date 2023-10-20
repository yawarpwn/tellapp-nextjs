'use client'

import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import TellLogo from './tell-logo'
import Modal from './modal'
import Input from './input'
import { getRuc, getDni } from '@/services/sunat'

const ComponenteParaImprimir = ({  label }) => {
  const { ruc, destination, recipient, phone, address } = label
  return (
    <>
      {[1, 2, 3].map((_, index) => {
        return (
          <div
            key={index}
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
                  <p>{recipient}</p>
                  <h3 className="text-xl font-bold uppercase">Ruc/Dni:</h3>
                  <p>{ruc}</p>
                </div>
                <div className="w-1/2 p-3">
                  <h3 className="text-xl font-bold uppercase">Destino:</h3>
                  <p className="">{destination}</p>
                  <h3 className="text-xl font-bold uppercase">Teléfono:</h3>
                  <p>{phone ?? ''}</p>
                </div>
              </div>
              {/* Bottom */}
              <div className="flex justify-center items-center border-2 border-black p-3 ">
                <img src="/shipping-icons.svg" alt="" className="h-[58px]" />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

const ComponenteDeImpresion = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const recipientInputRef = useRef(null)
  const rucInputRef = useRef(null)
  const componenteRef = useRef(null)
  const [labels, setLabels] = useState([])

  const handleImprimir = useReactToPrint({
    content: () => componenteRef.current,
  })

  const handleSearch = async event => {
    const { value } = event.target
    const isRuc = value.length === 11
    const isDni = value.length === 8

    if (isDni) {
      const { company } = await getDni(value)
      recipientInputRef.current.value = company
    }

    if (isRuc) {
      const { company } = await getRuc(value)
      recipientInputRef.current.value = company
    }
  }

  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const entries = Object.fromEntries(formData)
    setLabels([...labels, entries])
    onCloseModal()
  }

  const hasLabels = labels && labels.length > 0

  return (
    <div>
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative w-full">
              <Input
                name="ruc"
                // onChange={handleChange}
                onBlur={handleSearch}
                // value={label.ruc}
                labelText="Ruc"
                type="search"
                inputRef={rucInputRef}
              />
            </div>

            <Input
              name="recipient"
              // onChange={handleChange}
              // value={label.recipient}
              labelText="Destinatario"
              inputRef={recipientInputRef}
              type="text"
            />
            <Input
              name="destination"
              required
              // onChange={handleChange}
              // value={label.destination}
              labelText="Destino"
              type="text"
            />

            <Input
              name="phone"
              // onChange={handleChange}
              // value={label.phone}
              labelText="Télefono"
              type="number"
            />

            <Input
              name="address"
              // onChange={handleChange}
              // value={label.address}
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Para </th>
              <th>Dni / Ruc</th>
              <th>Destino</th>
              <th>Teléfono</th>
              <th>Direcciónn</th>
            </tr>
          </thead>
          <tbody>
            {hasLabels &&
              labels.map((label, index) => {
                return (
                  <tr key={index}>
                    <td>{label.recipient}</td>
                    <td>{label.ruc}</td>
                    <td>{label.destination}</td>
                    <td>{label.phone}</td>
                    <td>{label.address}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'none' }}>
        <div className="overflow-x-auto" ref={componenteRef}>
          {hasLabels && <ComponenteParaImprimir label={labels[0]} />}
        </div>
      </div>
    </div>
  )
}

export default ComponenteDeImpresion
