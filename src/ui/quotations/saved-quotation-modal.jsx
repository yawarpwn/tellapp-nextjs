import { Modal } from '../modal'

function SavedQuotationModal({ isOpen, onClose, onConfirm }) {
	return (
		<Modal
			size='md'
			title={'¿Deseas recupear la cotización guardada?'}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className='flex items-center justify-between'>
				<button type='button' className='btn btn-primary' onClick={onConfirm}>
					Aceptar
				</button>
				<button type='button' className='btn btn-secondary' onClick={onClose}>
					Cancelar
				</button>
			</div>
		</Modal>
	)
}

export default SavedQuotationModal
