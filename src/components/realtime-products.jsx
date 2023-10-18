'use client'

import { useState, useMemo, useEffect } from 'react'
import { DeleteIcon, EditIcon } from '@/icons'
import InputSearch from '@/components/input-search'
import { useRealTime } from '@/hooks/use-realtime'
import Pagination from './pagination'
import { ROW_PER_PAGE } from '@/constants'
import ConfirmModal from './confirm-modal'
import CreateUpdateProductModal from './create-update-product-modal'

function RealtimeQuotations({ serverProducts }) {
  const [page, setPage] = useState(1)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const {
    rows: products,
    deleteRow,
    updateRow,
    insertRow,
  } = useRealTime({
    initialData: serverProducts,
    table: 'products',
  })


  const handleEditProduct = product => {
    setEditingProduct(product)
    setIsOpenModal(true)
  }

  const [searchValue, setSearchValue] = useState('')

  const handleOpenModal = item => {
    if (item) {
      setIsOpenModal(true)
      setEditingProduct(item)
    }
    setIsOpenModal(true)
    setEditingProduct(null)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setEditingProduct(null)
  }

  const handleSearchChange = event => {
    const { value } = event.target
    setSearchValue(value)
    setPage(1)
  }

  const quotationsFiltered = useMemo(() => {
    if (!searchValue) {
      return products
    }
    return products.filter(quotation =>
      quotation.description.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [products, searchValue])

  const totalPages = useMemo(() => {
    return Math.ceil(quotationsFiltered.length / ROW_PER_PAGE)
  }, [quotationsFiltered])

  const nextPage = () => {
    if (page === totalPages) return
    setPage(page + 1)
  }

  const productsToRender = useMemo(() => {
    const start = (page - 1) * ROW_PER_PAGE
    const end = start + ROW_PER_PAGE
    return quotationsFiltered.slice(start, end)
  }, [page, quotationsFiltered])

  // useEffect(() => {
  //   setQuotations(serverProducts)
  // }, [serverProducts])

  return (
    <>
      <header className="flex justify-between items-center">
        <InputSearch
          onSearchChange={handleSearchChange}
          searchValue={searchValue}
          placeholder="Buscar producto..."
        />
        <button onClick={handleOpenModal} className="btn btn-primary">
          Crear
        </button>
      </header>
      {isOpenModal && (
        <CreateUpdateProductModal
          isOpenModal={isOpenModal}
          onCloseModal={handleCloseModal}
          editingProduct={editingProduct}
          updateProduct={updateRow}
          createProduct={insertRow}
        />
      )}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th>Categoria</th>
              <th>U/M</th>
              <th>Costo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productsToRender.map(product => {
              return (
                <tr key={product.id}>
                  <td>
                    <div>
                      <p className="w-[300px]">{product.description}</p>
                    </div>
                  </td>
                  <td>
                    <p className="w-[70px]">{product.code}</p>
                  </td>

                  <td>{product.category}</td>

                  <td>{product.unit_size}</td>

                  <td>{product.cost}</td>

                  <td>{product.price}</td>
                  <td className="flex gap-x-2">
                    <button
                      className="btn "
                      onClick={() => handleEditProduct(product)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn "
                      onClick={() => deleteRow(product.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        onNextPage={nextPage}
        updatePage={page => setPage(page)}
        totalPages={totalPages}
      />
    </>
  )
}

export default RealtimeQuotations
