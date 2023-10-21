'use client'
import { useEffect, useRef, useState } from 'react'
import Input from '@/components/input'
import Modal from '@/components/modal'
import { PlusIcon, UpdateIcon } from '@/icons'
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
  const [product, setProduct] = useState(editingProduct || initialState)


  const handleSubmit = async event => {
    event.preventDefault()

    if (editingProduct) {
      console.log('update product')
      await updateProduct(product)
    } else {
      console.log('create product')
      await createProduct(product)
    }

    onCloseModal()
  }

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <div>
        <h2 className="text-primary text-2xl font-bold">Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-4">
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Descripción</span>
                </label>

                <textarea required
                  onChange={e =>
                    setProduct(prev => ({ ...prev, description: e.target.value }))
                  }
                  value={product?.description}
                  placeholder="Descripcion de producto"
                  autoFocus
                  className='textarea textarea-primary h-[120px]'
                />
              </div>
              <Input
                required
                onChange={e =>
                  setProduct(prev => ({ ...prev, code: e.target.value }))
                }
                value={product?.code}
                labelText="Codigo"
                type="text"
                placeholder="Descripcion de producto"
              />
              <div className="flex gap-4">
                <Input
                  required
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
                  onChange={e =>
                    setProduct(prev => ({ ...prev, unit_size: e.target.value }))
                  }
                  value={product?.unit_size}
                  labelText="Unidad / Medida"
                  type="text"
                  placeholder="30x30cm"
                />
                <select
                  value={product?.category}
                  className="select"
                  onChange={e =>
                    setProduct(prev => ({ ...prev, category: e.target.value }))
                  }
                >
                  <option disabled selected>
                    Categoria
                  </option>
                  {Object.values(CATEGORIES).map(value => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              {editingProduct ? (
                <>
                  <UpdateIcon />
                  Actualizar
                </>
              ) : (
                <>
                  <PlusIcon /> Agregar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CreateUpdateProductModal
