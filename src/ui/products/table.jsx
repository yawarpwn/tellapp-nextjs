import { fetchFilteredProducts } from '@/lib/products-data'
import React from 'react'
import DeleteActionForm from '../delete-action-form'
import { deleteProduct } from '@/lib/actions/products'

async function ProductTable({ query, currentPage }) {
  const products = await fetchFilteredProducts({ query, currentPage })

  return (
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
          {products?.map(product => {
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
                  <DeleteActionForm id={product.id} deleteAction={deleteProduct} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
