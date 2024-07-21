import env from 'env-var'

export const envs = {
  EMAIL_PASSWORD: env.get('EMAIL_PASSWORD').required().asString(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: env
    .get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    .required()
    .asString(),
  CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
}
