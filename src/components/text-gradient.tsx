import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  children: React.ReactNode
  className?: string
}
export function TextGradient(props: Props) {
  const { as } = props
  const Component = as
  return (
    <Component
      className={cn(
        `bg-gradient-to-r from-[rgb(250_85_96)] via-[rgb(177_75_244)] to-[rgb(77_145_255)] bg-clip-text text-transparent`,
        props.className,
      )}
    >
      {props.children}
    </Component>
  )
}
