'use client'

import { useEffect, useState } from 'react'
import Input from '@/components/input'
import FormModal from '@/components/form-modal'
import { CATEGORIES } from '@/constants'

const initialState = {
  description: '',
  unit_size: '',
  price: '',
  code: '',
  category: 'seguridad',
  cost: 0,
}

function CreateUpdateProductModal({
  isOpenModal,
  onCloseModal,
  updateProduct,
  createProduct,
  editingProduct,
}) {
  console.log({editingProduct})
  const [product, setProduct] = useState(editingProduct || initialState)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    if (editingProduct) {
      setLoading(true)
      await updateProduct(product)
      setLoading(false)
      onCloseModal()
    } else {
      setLoading(true)
      await createProduct(product)
      setLoading(false)
      onCloseModal()
    }
  }

  useEffect(() => {
    setProduct(editingProduct)
  }, [editingProduct])

  return (
    <FormModal
      title={editingProduct ? 'Editar Producto' : 'Crear Producto'}
      isOpen={isOpenModal}
      onClose={onCloseModal}
      loading={loading}
      onSubmit={handleSubmit}
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Descripción</span>
        </label>

        <textarea
          required
          name="description"
          onChange={e =>
            setProduct(prev => ({
              ...prev,
              description: e.target.value,
            }))
          }
          value={product?.description}
          placeholder="Descripcion de producto"
          autoFocus
          className="textarea textarea-primary placeholder:text-base-content/30 h-[120px]"
        />
      </div>
      <Input
        required
        name="code"
        onChange={e => setProduct(prev => ({ ...prev, code: e.target.value }))}
        value={product?.code}
        labelText="Codigo"
        type="text"
        placeholder="Descripcion de producto"
      />
      <div className="flex gap-4">
        <Input
          required
          name="price"
          onChange={e =>
            setProduct(prev => ({
              ...prev,
              price: Number(e.target.value),
            }))
          }
          value={product?.price}
          labelText="Precio"
          type="number"
          step="0.5"
          placeholder="100"
        />

        <Input
          required
          name="cost"
          onChange={e =>
            setProduct(prev => ({
              ...prev,
              cost: Number(e.target.value),
            }))
          }
          value={product?.cost}
          labelText="Costo"
          type="number"
          placeholder="10.00"
        />
      </div>
      <div className="flex items-center gap-2 ">
        <Input
          required
          name="unit_size"
          onChange={e =>
            setProduct(prev => ({ ...prev, unit_size: e.target.value }))
          }
          value={product?.unit_size}
          labelText="Unidad / Medida"
          type="text"
          placeholder="30x30cm"
        />
        <select
          name="category"
          value={product?.category}
          className="select"
          onChange={e =>
            setProduct(prev => ({ ...prev, category: e.target.value }))
          }
        >
          {Object.values(CATEGORIES).map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </FormModal>
  )
}

export default CreateUpdateProductModal
