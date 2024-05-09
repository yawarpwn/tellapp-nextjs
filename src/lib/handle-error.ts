import { type PostgrestError } from '@supabase/supabase-js'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { ZodError } from 'zod'

function isPostgresError(error: unknown): error is PostgrestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'details' in error &&
    'hint' in error &&
    'code' in error
  )
}

export function getErrorMessage(error: unknown) {
  // let errorMessage = 'Error inesperado, por favor intente de nuevo'

  if (error instanceof ZodError) {
    return error.issues.map(issue => issue.message).join('\n')
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Error inesperado, por favor intente de nuevo'
}
