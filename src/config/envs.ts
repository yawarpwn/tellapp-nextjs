import env from 'env-var'
import dotenv from 'dotenv'
dotenv.config({
  path: ['.env.local', '.env'],
})

export const envs = {
  CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
  JWT_SECRET: env.get('JWT_SECRET').default('SUPER_SECRET').asString(),
  DB_CONNECTION_STRING: env.get('DB_CONNECTION_STRING').required().asString(),
  RESEND_API_KEY: env.get('RESEND_API_KEY').required().asString(),
}
