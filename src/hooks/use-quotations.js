import { useState } from 'react';


export default function useQuotations({ initialData  }) {
  const [quotation, setQuotation] = useState(initialData);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCustomersModalOpen, setIsCustomersModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const updateQuotation = newQuotationData => {
    setQuotation({
      ...quotation,
      ...newQuotationData,
    });
  };

  const closeItemModal = () => setIsItemModalOpen(false);
  const openItemModal = () => setIsItemModalOpen(true);
  const openCustomersModal = () => setIsCustomersModalOpen(true);
  const closeCustomersModal = () => setIsCustomersModalOpen(false);

  const deleteItem = id => {
    setQuotation({
      ...quotation,
      items: quotation.items.filter(item => item.id !== id),
    });
  };

  const addItem = newItem => {
    setQuotation({
      ...quotation,
      items: [...quotation.items, newItem],
    });
  };

  const updateItem = editedItem => {
    setQuotation({
      ...quotation,
      items: quotation.items.map(item => (item.id === editedItem.id ? editedItem : item)),
    });
  };

  const openEditItemModal = itemToEdit => {
    setEditingItem(itemToEdit);
    openItemModal();
  };

  const closeEditItemModal = () => {
    setEditingItem(null);
    closeItemModal();
  };

  const handleInputChange = event => {
    let { name, value } = event.target;

    if (name === 'price' || name === 'qty') {
      value = parseInt(value);
    }

    setQuotation({
      ...quotation,
      [name]: value,
    });
  };

  return {
    addItem,
    deleteItem,
    updateItem,
    updateQuotation,
    openCustomersModal,
    closeCustomersModal,
    handleInputChange,
    openEditItemModal,
    openItemModal,
    closeEditItemModal,
    quotation,
    isItemModalOpen,
    isCustomersModalOpen,
    editingItem,
  };
}

