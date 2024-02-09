'use client'
import { GALLERY_CATEGORIES } from '@/constants'
import { uploadFile } from '@/lib/actions/gallery'
import { Input } from '@/ui/components/input'
import { useState } from 'react'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

export function UploadFileForm({ closeModal }) {
	const [imagePreview, setImagePreview] = useState(null)
	const [loading, setLoading] = useState(false)
	const [isPending, startTransition] = useTransition()

	const handleSubmit = (event) => {
		event.preventDefault()
		const form = event.currentTarget
		const formData = new FormData(event.currentTarget)
		startTransition(async () => {
			try {
				const result = await uploadFile(formData)
				toast.success(result.message)
				form.reset()
				closeModal()
			} catch (error) {
				toast.error(error)
			}
		})
	}

	const onChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			setLoading(true)
			const reader = new FileReader()
			reader.onload = () => {
				setImagePreview(
					reader.result,
					setLoading(false),
				)
			}
			reader.readAsDataURL(file)
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col gap-4'>
				<Input
					required
					name='title'
					labelText='Titulo'
					placeholder='Senal de seguridad preventiva ...'
				/>
				<select
					disabled={isPending}
					required
					name='category'
					className='select select-bordered'
				>
					<option value='' disabled>Elige una Categoría</option>
					{Object.entries(GALLERY_CATEGORIES).map(([key, value]) => {
						return <option key={key} value={key}>{value}</option>
					})}
				</select>
				<div>
					<label
						className='block mb-2 text-sm font-medium '
						htmlFor='file_input'
					>
						Upload file
					</label>
					<input
						disabled={isPending}
						required
						name='imageFile'
						onChange={onChange}
						className='block w-full text-sm text-base-content border border-base-300 rounded-lg cursor-pointer bg-base-200  focus:outline-none '
						aria-describedby='file_input_help'
						id='file_input'
						type='file'
					/>
				</div>
				<div className='flex flex-col items-center'>
					{imagePreview
						&& (
							<div className='w-full h-64'>
								<img
									className='w-full h-full object-contain'
									src={imagePreview}
								/>
							</div>
						)}
					{loading && <span className='loading loading-lg loading-spinner' />}
				</div>
				<button disabled={isPending} className='btn btn-primary w-full'>
					{isPending && <span className='loading loading-spinner' />}
					Agregar foto
				</button>
			</div>
		</form>
	)
}
