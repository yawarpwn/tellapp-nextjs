import Modal from '../modal'

function SavedQuotationModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      size="xs"
      title={'¿Deseas recupear la cotizacion ?'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-between">
        <button className="btn btn-success" onClick={onConfirm}>
          Aceptar
        </button>
        <button className="btn btn-error" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  )
}

export default SavedQuotationModal
