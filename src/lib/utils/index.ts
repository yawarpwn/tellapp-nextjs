import { clsx } from 'clsx'
import { type ClassNameValue, twMerge } from 'tailwind-merge'
export * from './pagination'
export * from './format'

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs))
}
