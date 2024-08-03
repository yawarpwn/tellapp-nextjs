'use client'
import { UploadFileForm } from '../ui/gallery/upload-file-form'
import { Modal } from '../ui/modal'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export function GalleryAddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button onClick={handleOpenModal} className="btn btn-sm btn-primary">
        <PlusIcon />
        Agregar
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UploadFileForm closeModal={handleCloseModal} />
      </Modal>
    </>
  )
}
