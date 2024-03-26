import { Modal } from ../ui/modal'
import { ItemForm } from './item-form'

function ItemModal(
	{ isOpenModal, onCloseModal, editingItem, addItem, updateItem },
) {
	return (
		<Modal size='lg' isOpen={isOpenModal} onClose={onCloseModal}>
			<ItemForm
				onCloseModal={onCloseModal}
				editingItem={editingItem}
				addItem={addItem}
				updateItem={updateItem}
			/>
		</Modal>
	)
}

export default ItemModal
