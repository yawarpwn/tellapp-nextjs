import { useFormStatus } from 'react-dom'

export default function SubmitActionButton({ text = 'actuando...' }) {
	const { pending } = useFormStatus()
	return (
		<button disabled={pending} type="submit" className={`btn ${pending ? 'btn-disabled' : ''}`}>
			{pending ? <span className="loading loading-dots"></span> : <span>Aceptar</span>}
		</button>
	)
}
