export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
  }

  static internalError(message?: string) {
    const defaultMessage = 'Error en Database '
    return new DatabaseError(message ?? defaultMessage)
  }
}
