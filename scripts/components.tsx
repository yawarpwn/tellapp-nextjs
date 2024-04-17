type  ButtonProps = {
  text: string
}

type IconProps = {
  icon: string
}

type IsButton <T> =  T extends 'button' ? ButtonProps : IconProps
  
export function Button<T extends 'button' | 'icon'>({ type, ...props}: { type: T} & IsButton<T>) {
  return type === 'button' ? (
  <button>tipo buton</button>
  ) : <button>tipo Icon</button> 
}
