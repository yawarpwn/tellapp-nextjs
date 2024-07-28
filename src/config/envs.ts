import env from 'env-var'
import dotenv from 'dotenv'
dotenv.config({
  path: ['.env.local', '.env'],
})

export const envs = {
  EMAIL_PASSWORD: env.get('EMAIL_PASSWORD').required().asString(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: env
    .get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    .required()
    .asString(),
  CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
  DATABASE_URL: env.get('DATABASE_URL').required().asString(),
  JWT_SECRET: env.get('JWT_SECRET').default('SUPER_SECRET').asString(),
  DB_CONNECTION_STRING: env.get('DB_CONNECTION_STRING').required().asString(),
}
