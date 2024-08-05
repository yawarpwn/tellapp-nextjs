import { db } from '@/db'
import { usersTable } from '@/db/schemas'
export class UsersModel {
  static async getUserByEmail(email: string) {
    try {
      const result = await db.select().from(usersTable)
      return {
        success: true,
        message: 'Usuario encontrado',
        data: result[0],
      }
    } catch (error) {
      return {
        success: false,
        message: `${email} no existe en la base de datos`,
        data: null,
      }
    }
  }
}
