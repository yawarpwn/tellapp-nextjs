import { DatabaseError } from '@/errors'

type DatabaseResponseSuccess<T> = {
  data: T
  error: null
}
type DatabaseResponseFailure = {
  data: null
  error: DatabaseError
}

export type DatabaseResponse<T> = DatabaseResponseSuccess<T> | DatabaseResponseFailure
