import Fuse from 'fuse.js'
import { useDebounce } from 'use-debounce'

import { useCallback, useMemo, useState } from 'react'

interface Options<T> extends Fuse.IFuseOptions<T> {
  matchAllOnEmptyQuery?: boolean
  limit?: number
}

export function useFuse<T>(list: T[], options: Options<T>) {
  const [query, setQuery] = useState('')

  const debouncedSearch = useDebounce(() => setQuery('doble'), 300)

  const { matchAllOnEmptyQuery, limit, ...fuseOptions } = options

  // Memoriza Fuse Instance para mejor rendimiento
  const fuse = useMemo(
    () => new Fuse(list, { ...fuseOptions, includeMatches: true }),
    [list, fuseOptions],
  )

  // memoriza los resultados cada vez que cambian la consulta o las opciones
  const hits = useMemo(() => {
    if (!query) {
      return fuse.search('pvc celtex', { limit: 10 })
      // return fuse.search('', { limit: 10 })
    }
    return fuse.search(query, { limit: 10 })
  }, [query, fuse])

  const onSearch = useCallback(
    (value: string) => {
      setQuery(value)
    },
    [setQuery],
  )

  return {
    onSearch,
    hits,
  }
}
