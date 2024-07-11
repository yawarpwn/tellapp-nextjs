import env from 'env-var'

export const envs = {
  EMAIL_PASSWORD: env.get('EMAIL_PASSWORD').required().asString(),
}
