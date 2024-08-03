import { GradientIcons, IconProps } from '@/icons'
import { useId } from 'react'

export default function SignalIcon(props: IconProps) {
  const { hasGradient, ...restProps } = props
  const id = useId()
  return (
    <svg
      {...restProps}
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth="0"
      fill="currentColor"
    >
      <path
        d="M22.5 0h-21C1.1 0 .7.2.4.4.2.7 0 1.1 0 1.5v21c0 .8.7 1.5 1.5 1.5h21c.4 0 .8-.2 1.1-.4.3-.3.4-.6.4-1.1v-21c0-.8-.7-1.5-1.5-1.5zm.1 22.6H1.5c-.1 0-.1-.1-.1-.1V1.4s.1 0 0 0h21.1c.1 0 .1.1.1.1v21.1z"
        fill={hasGradient ? `url(#${id})` : 'currentColor'}
      ></path>
      <path
        d="M20.8 9.7h-9.3L16 5.1c.1-.1.2-.4.1-.5s-.3-.3-.5-.3h-5.2c-.1 0-.3.1-.4.1l-7.2 7.2c-.2.2-.2.5 0 .7l7.2 7.2c.1.1.2.1.4.1h5.2c.2 0 .4-.1.5-.3s0-.4-.1-.5l-4.5-4.5h9.3c.3 0 .5-.2.5-.5v-3.7c0-.2-.3-.4-.5-.4z"
        fill={hasGradient ? `url(#${id})` : 'currentColor'}
      ></path>
      {hasGradient && <GradientIcons id={id} />}
    </svg>
  )
}
