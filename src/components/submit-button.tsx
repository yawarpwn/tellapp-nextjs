import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

interface Props {
	text?: string
}
export function SubmitButton({ text = 'Aceptar' }: Props) {
	const { pending } = useFormStatus()
	return (
		<Button
			variant={'primary'}
			disabled={pending}
			type='submit'
		>
			{pending
				&& <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
			<span>{text}</span>
		</Button>
	)
}
