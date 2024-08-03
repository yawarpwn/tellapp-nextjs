import { IconProps } from '.'
const SvgComponent = (props: IconProps) => (
  <svg width={20} height={20} fill="none" aria-hidden="true" viewBox="0 0 20 14" {...props}>
    <path
      fill="currentColor"
      d="M7 1a1 1 0 0 1 1-1h11a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1Zm12 5H1a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Zm-7 6H1a1 1 0 0 0 0 2h11a1 1 0 0 0 0-2Z"
    />
  </svg>
)
export default SvgComponent
