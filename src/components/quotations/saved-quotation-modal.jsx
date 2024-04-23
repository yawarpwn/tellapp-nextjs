import { Button } from '@/components/ui/button'
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
				<Button variant='primary' type='button' onClick={onConfirm}>
					Aceptar
				</Button>
				<Button variant='secondary' type='button' onClick={onClose}>
					Cancelar
				</Button>
			</div>
		</Modal>
	)
}

export default SavedQuotationModal
