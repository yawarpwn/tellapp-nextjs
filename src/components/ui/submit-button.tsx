import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'

interface Props {
	text?: string
	className?: string
}
export function SubmitButton({ text = 'Aceptar', className }: Props) {
	const { pending } = useFormStatus()
	return (
		<button
			disabled={pending}
			type='submit'
			className={cn(
				'btn btn-secondary w-full',
				pending && 'btn-disabled',
				className,
			)}
		>
			{pending && <span className='loading loading-spinner'></span>}
			<span>{text}</span>
		</button>
	)
}
