'use client'
import { getDni, getRuc } from '@/services/sunat'
import { Input } from '@/components/input'
import { SubmitButton } from '@/components/submit-button'
import toast from '@/components/toaster'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import ItemPickerModal from '@/ui/item-picker-modal'

const initialState = {
	message: null,
	errors: {},
}

const initialLabel = {
	destination: '',
	dni_ruc: ' ',
	recipient: '',
	phone: '',
	address: '',
	agency_id: '',
}

function AddLabelForm({ labelToEdit, action, serverAgencies }) {
	const [state, dispatch] = useFormState(action, initialState)
	const [label, setLabel] = useState(labelToEdit ?? initialLabel)
	const [isOpenAgenciesModal, setIsOpenAgenciesModal] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const handleChange = event => {
		const { value, name } = event.target
		setLabel({ ...label, [name]: value })
	}

	const handleSearch = async () => {
		const isRuc = label.dni_ruc.length === 11
		const isDni = label.dni_ruc.length === 8

		if (isDni) {
			console.log('isDni')
			setLoading(true)
			try {
				const { company } = await getDni(label.dni_ruc)
				setLabel({
					...label,
					recipient: company,
				})
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		if (isRuc) {
			console.log('isRuc')
			setLoading(true)
			try {
				const { company } = await getRuc(label.dni_ruc)
				setLabel({
					...label,
					recipient: company,
				})
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
	}

	const openAgenciesModal = () => {
		setIsOpenAgenciesModal(true)
	}

	const closeAgenciesModal = () => {
		setIsOpenAgenciesModal(false)
	}

	const handlePick = agency => {
		setLabel({
			...label,
			agencies: agency,
		})
	}

	const hasAgency = label?.agencies

	useEffect(() => {
		if (error) {
			const errorNotify = () => toast.error(error)
			errorNotify()
		}
	}, [error])

	return (
		<>
			<ItemPickerModal
				isOpen={isOpenAgenciesModal}
				onClose={closeAgenciesModal}
				onPick={handlePick}
				items={serverAgencies}
				renderLabel={item => <p>{item.company}</p>}
				filterProperty='company'
			/>
			<header className='flex justify-end'>
				<button
					onClick={openAgenciesModal}
					type='button'
					className='btn btn-primary'
				>
					Agencias Sugeridas
				</button>
			</header>
			<form action={dispatch}>
				{/* {state?.message && <div className='text-red-500 text-sm'>{state.message}</div>} */}
				<div className='relative w-full'>
					<Input
						name='dni_ruc'
						autoFocus
						onChange={handleChange}
						onBlur={handleSearch}
						value={label?.dni_ruc}
						labelText='Dni / Ruc'
						type='number'
						disabled={loading}
						required
					/>
				</div>

				<Input
					name='recipient'
					onChange={handleChange}
					value={label?.recipient}
					labelText='Destinatario'
					type='text'
					disabled={loading}
					required
					errors={state.errors?.recipient}
				/>
				<Input
					name='destination'
					onChange={handleChange}
					value={label?.destination}
					labelText='Destino'
					type='text'
					disabled={loading}
					required
					errors={state.errors?.destination}
				/>

				<Input
					name='phone'
					onChange={handleChange}
					value={label?.phone}
					labelText='Télefono'
					type='number'
					disabled={loading}
					errors={state.errors?.phone}
				/>

				<Input
					name='address'
					onChange={handleChange}
					value={label?.address}
					labelText='Dirección'
					type='text'
					disabled={loading}
					errors={state.errors?.address}
				/>
				<input type='hidden' name='id' value={label?.id} />
				<input
					type='hidden'
					name='agency_id'
					value={label?.agencies?.id ?? ''}
				/>
				<div className='flex justify-center mt-4'>
					{hasAgency && (
						<div className='card w-80 bg-primary text-primary-content'>
							<div className='card-body'>
								<h2 className='card-title'>Agencia Sugerida</h2>
								<p>{label.agencies.company}</p>
								<p>{label.agencies.address}</p>
								<p>{label.agencies?.phone}</p>
							</div>
						</div>
					)}
				</div>
				<footer className='mt-4 flex justify-between'>
					<Link href={'/customers'} className='btn'>
						Cancelar
					</Link>
					<SubmitButton />
				</footer>
			</form>
		</>
	)
}

export default AddLabelForm
