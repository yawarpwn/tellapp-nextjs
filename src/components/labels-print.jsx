'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import CreateUpdateLabelModal from './crea-update-label-modal'
import PrintLabel from './print-label'
import { DeleteIcon, EditIcon, PrinterIcon } from "@/icons"

const loadFromLocalStorage = () => {
  const labels = window.localStorage.getItem('__TELL__LABELS')
  return JSON.parse(labels) ?? []
}


const PrintComponent = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [labelToPrint, setLabelToPrint] = useState(null)
  const [editingLabel, setEditingLabel] = useState(null)
  const componenteRef = useRef(null)
  const [labels, setLabels] = useState(loadFromLocalStorage())

  const handlePrint = useReactToPrint({
    content: () => componenteRef.current,
  })

  const handleClickPrint = (label) => {
    setLabelToPrint(label)
    handlePrint()
  }

  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleEditLabelClick = (label) => {
    setEditingLabel(label)
    setIsOpenModal(true)
  }

  const saveOnLocalStorage = (labels) => {
    window.localStorage.setItem('__TELL__LABELS', JSON.stringify(labels))
  }

  useEffect(() => {
    if (labelToPrint) {
      handlePrint();
    }
  }, [labelToPrint, handlePrint]);

  const handleCreateLabel = (labelToCreate) => {
    const labelsToUpdate = [...labels, { ...labelToCreate, id: crypto.randomUUID() }]
    setLabels(labelsToUpdate)
    saveOnLocalStorage(labelsToUpdate)
  }

  const handleUpdateLabel = (labelToUpdate) => {
    const labelsToUpdate = labels.map(label => label.id === labelToUpdate.id ? labelToUpdate : label)
    setLabels(labelsToUpdate)
    saveOnLocalStorage(labelsToUpdate)
  }

  const handleDeleteLabel = (id) => {
    const filteredLabels = labels.filter(label => label.id !== id)
    setLabels(filteredLabels)
    saveOnLocalStorage(filteredLabels)
  }


  const hasLabels = labels && labels.length > 0

  return (
    <div>
      {isOpenModal && (
        <CreateUpdateLabelModal
          editingLabel={editingLabel}
          onEditLabel={handleUpdateLabel}
          onCreateLabel={handleCreateLabel}
          isOpenModal={isOpenModal}
          onCloseModal={onCloseModal} />
      )}
      <header className="flex items-center justify-between">
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
              <th>Acciónes</th>
            </tr>
          </thead>
          <tbody>
            {hasLabels &&
              labels.map((label, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <p className='w-[250px]'>
                        {label.recipient}
                      </p>
                    </td>
                    <td>
                      <p>
                        {label.ruc}
                      </p>
                    </td>
                    <td>
                      <p className='whitespace-nowrap'>
                        {label.destination}
                      </p>
                    </td>
                    <td>
                      <p className='whitespace-nowrap'>
                        {label.phone}
                      </p>
                    </td>
                    <td>{label.address}</td>
                    <td>
                      <div className='flex gap-2'>
                        <button className='btn btn-primary'
                          onClick={() => handleEditLabelClick(label)}>
                          <EditIcon />
                        </button>
                        <button className='btn btn-primary'
                          onClick={() => handleClickPrint(label)}>
                          <PrinterIcon />
                        </button>
                        <button className='btn btn-error'
                          onClick={() => handleDeleteLabel(label.id)}>
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'none' }}>
        <div className="overflow-x-auto" ref={componenteRef}>
          {labelToPrint && <PrintLabel label={labelToPrint} />}
        </div>
      </div>
    </div>
  )
}

export default PrintComponent
