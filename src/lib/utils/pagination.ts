export function generatePagination(currentPage: number, totalPages: number) {
  // Si el total de paginas es menor o igual a 7
  // muestra todas las paginas sin saltos de pagina.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1) // [1, 2, 3, 4, 5, 6, 7]
  }

  // Si la pagina actual esta entre las primeras 3
  // Muestra las primeras 3, puntos suspensivos y las ultimas 2 paginas
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages] // [1, 2, 3, '...', 6, 7]
  }

  // Si la pagina actual esta entre las ultimas 3
  // Muestra las ultimas 3, un salto de pagina, y las primeras 2 paginas
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages] // [1, 2, '...', 6, 7, 8]
  }

  // Si la pagina actual esta en un punto intermedio
  // Muestra la primera pagina, puntos suspensivos, la pagina actual y sus vecinos,
  // Otros puntos suspensivos y la ultima pagina
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ] // [1, '...', 3, 4, 5, '...', 8]
}
