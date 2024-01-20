import { cn } from '@/utils'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ text = 'Aceptar', className }) {
	const { pending } = useFormStatus()
	return (
		<button
			disabled={pending}
			type='submit'
			className={cn('btn', {
				'btn-disabled': pending,
			}, className)}
		>
			{pending
				? <span className='loading loading-dots'></span>
				: <span>{text}</span>}
		</button>
	)
}
