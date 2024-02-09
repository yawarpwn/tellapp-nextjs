'use client'
import { GALLERY_CATEGORIES } from '@/constants'
import { uploadFile } from '@/lib/actions/gallery'
import { Input } from '@/ui/components/input'
import { useState } from 'react'
import { SubmitButton } from '../components/submit-button'
export function UploadFilesForm() {
	const [imagePreview, setImagePreview] = useState(null)

	const onChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.onload = () => {
				setImagePreview(
					reader.result,
				)
			}
			reader.readAsDataURL(file)
		}
	}
	return (
		<form action={uploadFile}>
			<div className='flex flex-col gap-4'>
				<Input required name='title' labelText='Titulo' />
				<select required name='category' className='select select-bordered'>
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
						? (
							<div className='w-full h-64'>
								<img
									className='w-full h-full object-contain'
									src={imagePreview}
								/>
							</div>
						)
						: <div className='skeleton w-full h-64'></div>}
				</div>
				<SubmitButton className={'w-full btn-primary'} text='Subir foto' />
			</div>
		</form>
	)
}
