'use client'
import { GALLERY_CATEGORIES } from '@/constants'
import { uploadFile } from '@/lib/actions/gallery'
import { Input } from '@/ui/components/input'
import { cn } from '@/utils'
import { ImageIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTransition } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

export function UploadFileForm({ closeModal }) {
	const [files, setFiles] = useState([])
	const [isPending, startTransition] = useTransition()

	const onDrop = useCallback((acceptedFiles) => {
		setFiles(acceptedFiles.map(file =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
		))
		// acceptedFiles.forEach(file => {
		// 	const reader = new FileReader()
		//
		// 	reader.onabort = () => console.log(' abort')
		// 	reader.onabort = () => console.log('file reading was aborted')
		// 	reader.onerror = () => console.log('file reading has failed')
		// 	reader.onload = () => {
		// 		// Do whatever you want with the file contents
		// 		const binaryStr = reader.result
		// 		console.log(binaryStr)
		// 	}
		// 	reader.readAsArrayBuffer(file)
		// })
	}, [])

	const ImagesPreview = () => {
		return files.map(file => (
			<div key={file.name} className='w-full h-64 rounded-md overflow-hidden'>
				<img
					className='w-full h-full object-cover'
					src={file.preview}
					// onLoad={() =>
					// 	URL.revokeObjectURL(file.preview)}
				/>
			</div>
		))
	}

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		acceptedFiles,
		isDragReject,
		isDragAccept,
		open,
	} = useDropzone({
		onDrop,
		disabled: false,
		noClick: true,
		noKeyboard: false,
		noDrag: false,
		accept: {
			'image/*': [],
		},
		maxFiles: 1,
	})

	const handleSubmit = (event) => {
		event.preventDefault()
		const form = event.currentTarget
		const formData = new FormData()
		formData.append('title', form.title.value)
		formData.set('imageFile', acceptedFiles[0])
		formData.append('category', form.category.value)

		startTransition(async () => {
			const { success, message } = await uploadFile(formData)
			if (!success) {
				toast.error(message)
				return
			}
			toast.success(message)
			form.reset()
			closeModal()
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<section className='flex flex-col gap-4'>
				{files.length === 0
					? (
						<div
							{...getRootProps()}
						>
							<label
								className={cn(
									`mb-2 text-sm font-medium h-64 w-full flex items-center 
                  justify-center bg-base-200  border-2 border-base-300 
                  border-dashed cursor-pointer hover:bg-base-300 hover:border-zinc-600`,
									{
										'border-success': isDragAccept,
										'border-error': isDragReject,
									},
								)}
								htmlFor='file_input'
							>
								<div className='flex flex-col items-center text-zinc-600 p-8'>
									<ImageIcon className='w-14 h-14' />
									<p className='mb-2 text-sm text-center '>
										<span className='font-semibold'>
											{isDragActive
												? 'Suelta la imagen aqui ...'
												: 'Arrastra y suelta aqui, o click para seleccionar archivos'}
										</span>
										{' '}
									</p>
									<p className='text-xs '>
										SVG, PNG, JPG or GIF
									</p>
								</div>
								<input
									{...getInputProps({})}
									disabled={isPending}
									required
									className='block w-full text-sm text-base-content border border-base-300 rounded-lg cursor-pointer bg-base-200  focus:outline-none '
									aria-describedby='file_input_help'
									id='file_input'
									type='file'
								/>
							</label>
						</div>
					)
					: <ImagesPreview />}
				<Input
					required
					name='title'
					labelText='Titulo'
					placeholder='Senal de seguridad preventiva ...'
				/>
				<select
					defaultValue=''
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
				<button disabled={isPending} className='btn btn-primary w-full'>
					{isPending && <span className='loading loading-spinner' />}
					Agregar foto
				</button>
			</section>
		</form>
	)
}
