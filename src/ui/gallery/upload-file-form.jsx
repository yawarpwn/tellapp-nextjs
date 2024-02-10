'use client'
import { GALLERY_CATEGORIES } from '@/constants'
import { uploadFile } from '@/lib/actions/gallery'
import { Input } from '@/ui/components/input'
import { ImageIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useTransition } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

export function UploadFileForm({ closeModal }) {
	const [imagePreview, setImagePreview] = useState(null)
	const [loading, setLoading] = useState(false)
	const [isPending, startTransition] = useTransition()

	console.log('render component')

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader()

			reader.onabort = () => console.log(' abort')
			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result
				console.log(binaryStr)
			}
			reader.readAsArrayBuffer(file)
		})
	}, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		acceptedFiles,
		isDragReject,
		isDragAccept,
	} = useDropzone({
		onDrop,
		disabled: false,
		noKeyboard: false,
		noDrag: false,
		accept: {
			'image/*': ['.jpg', '.png'],
		},
		maxFiles: 1,
	})

	const handleSubmit = (event) => {
		event.preventDefault()
		const form = event.currentTarget
		const formData = new FormData()
		formData.append('title', form.title.value)
		formData.append('imageFile', acceptedFiles[0])
		formData.append('category', form.category.value)

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
			<section className='flex flex-col gap-4'>
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

				<div {...getRootProps()}>
					<label
						className={`mb-2 text-sm font-medium h-64 w-full flex items-center 
justify-center bg-base-200 hover:bg-base-300 border-2 border-base-300 border-dashed cursor-pointer`}
						htmlFor='file_input'
					>
						<div className='flex flex-col items-center text-zinc-600'>
							<ImageIcon className='w-14 h-14' />
							<p class='mb-2 text-sm '>
								<span class='font-semibold'>
									{isDragActive
										? 'Drop the files here ...'
										: 'Drag and drop some files here, or click to select files'}
								</span>
								{' '}
							</p>
							<p class='text-xs '>
								SVG, PNG, JPG or GIF (MAX. 800x400px)
							</p>
						</div>
						<input
							{...getInputProps()}
							disabled={isPending}
							required
							className='block w-full text-sm text-base-content border border-base-300 rounded-lg cursor-pointer bg-base-200  focus:outline-none '
							aria-describedby='file_input_help'
							id='file_input'
							type='file'
						/>
					</label>
				</div>
				<aside className='flex flex-col items-center'>
					{acceptedFiles.length > 0
						&& (
							<div className='w-full h-64 rounded-md overflow-hidden'>
								<img
									className='w-full h-full object-cover'
									src={URL.createObjectURL(acceptedFiles[0])}
								/>
							</div>
						)}
					{loading && <span className='loading loading-lg loading-spinner' />}
				</aside>
				<button disabled={isPending} className='btn btn-primary w-full'>
					{isPending && <span className='loading loading-spinner' />}
					Agregar foto
				</button>
			</section>
		</form>
	)
}
