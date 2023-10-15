import { ChevronDobleRightIcon } from '@/icons'
import clsx from 'clsx'
export default function Pagination({
  totalPages,
  updatePage,
  currentPage,
  onNextPage,
}) {
  // Limitar el número máximo de páginas visibles a la vez
  const maxVisiblePages = 3

  // Calcular el rango de páginas a mostrar alrededor de la página actual
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)
  let startPage = Math.max(currentPage - halfMaxVisiblePages, 1)
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

  // Ajustar el inicio si estamos cerca del final
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1)
  }

  const pagesArray = Array.from({ length: endPage - startPage + 1 }).map(
    (_, index) => startPage + index,
  )

  return (
    <nav className="p-2.5 flex justify-center">
      <ul className="join">
        {startPage > 1 && (
          <button className="btn join-item " onClick={() => updatePage(1)}>
            1
          </button>
        )}

        {startPage > 2 && <button className="btn join-item ">...</button>}

        {pagesArray.map(page => (
          <button
            className={`btn join-item ${
              page === currentPage ? 'btn-active' : ''
            } `}
            key={page}
            onClick={() => updatePage(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages - 1 && (
          <button className="btn join-item  btn-disabled">...</button>
        )}

        {endPage < totalPages && (
          <button
            className="btn join-item"
            onClick={() => updatePage(totalPages)}
          >
            {totalPages}
          </button>
        )}

        <button onClick={onNextPage} className="btn join-item">
          <ChevronDobleRightIcon size={15} />
        </button>
      </ul>
    </nav>
  )
}
