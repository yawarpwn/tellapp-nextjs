import { fetchProductsPages } from '@/lib/products-data'
import { Suspense } from 'react'
import ProductTable from '@/ui/products/table'
import Search from '@/ui/search'
import { AddButton } from '@/ui/buttons'
import Pagination from '@/ui/pagination'

async function ProductsPage({ searchParams}) {
  const page = Number(searchParams?.page) || 1
  const query = searchParams?.query || ''
  const totalPages = await fetchProductsPages(query)
  return (
    <div>
      <header className="flex items-center justify-between">
        <Search placeholder="Buscar producto..." />
        <AddButton href={'/products/create'} />
      </header>
      <Suspense fallback="Loading...">
        <ProductTable query={query} currentPage={page} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  )
}

export default ProductsPage
