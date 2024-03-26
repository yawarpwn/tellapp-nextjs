'use client'
import { GALLERY_CATEGORIES } from '@/constants'
import { XIcon } from '@/icons'
import { uploadFiles } from '@/lib/actions/gallery'
import { cn } from '@/lib/utils'
import { ImageIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { useCallback, useState, useTransition } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

interface FileType extends File {
	preview: string
}
interface Props {
	closeModal: () => void
}
export function UploadFileForm({ closeModal }: Props) {
	const [files, setFiles] = useState<FileType[]>([])
	// const [isPending, setLoading] = useState(false)
	const [isPending, startTransition] = useTransition()

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(acceptedFiles.map(file =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
		))
	}, [])

	const ImagesPreview = () => {
		return (
			<div className='w-full h-64 rounded-md overflow-hidden grid grid-cols-5'>
				{files.map(file => {
					return (
						<div className='relative ' key={file.name}>
							<button
								className='absolute top-2 right-1 btn btn-primary text-white btn-circle btn-xs '
								onClick={() => {
									setFiles(files.filter(f => f.name !== file.name))
								}}
							>
								<XIcon size={16} />
							</button>
							<img
								className='w-full h-full object-contain'
								src={file.preview}
								// onLoad={() =>
								// 	URL.revokeObjectURL(file.preview)}
							/>
						</div>
					)
				})}
			</div>
		)
	}

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
		noClick: true,
		noKeyboard: false,
		noDrag: false,
		accept: {
			'image/*': [],
		},
		maxFiles: 10,
	})

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()

		// const formData = new FormData()
		const formData = new FormData(event.target)

		files.forEach(file => {
			formData.append('files', file)
		})

		startTransition(async () => {
			const { success, message } = await uploadFiles(formData)

			if (!success) {
				toast.error(message)
				return
			}

			toast.success(message)
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
							<div className='bg-base-200 range-500 p-4'>
								<label
									className={cn(
										`mb-2 text-sm font-medium h-64 w-full flex items-center 
                    justify-center bg-base-200  border-4 border-base-300 rounded-[1.5rem] 
                    border-dashed cursor-pointer hover:bg-base-300 hover:border-zinc-600`,
										{
											'border-success': isDragAccept,
											'border-error': isDragReject,
										},
									)}
									htmlFor='file_input'
								>
									<div className='flex flex-col items-center text-zinc-600 p-8'>
										<div className='relative'>
											<span className='absolute -top-1 -left-1 w-8 h-8 rounded-full bg-white flex items-center justify-center'>
												<PlusIcon className='text-primary' />
											</span>
											<ImageIcon className='w-14 h-14' />
										</div>
										{isDragActive
											? (
												<h4 className='text-xl font-bold mt-4'>
													Suelta tu archivo de imagen aqui ...
												</h4>
											)
											: (
												<h4 className='text-xl font-bold mt-4'>
													Arrastra y suelta las imagenes o{' '}
													<span className='text-primary'>explora</span>
												</h4>
											)}
										<p className='text-xs mt-2 text-center'>
											La imagen debe estar en formato JPEG, JPG, PNG
										</p>
									</div>
									<input
										{...getInputProps({})}
										required
										className='block w-full text-sm text-base-content border border-base-300 rounded-lg cursor-pointer bg-base-200  focus:outline-none '
										aria-describedby='file_input_help'
										id='file_input'
										type='file'
									/>
								</label>
							</div>
						</div>
					)
					: <ImagesPreview />}
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
				<select
					className='select select-bordered'
					defaultValue=''
					required
					disabled={isPending}
					name='folder'
				>
					<option value='' disabled>Selecciona una carpeta</option>
					<option value='gallery'>Galeria</option>
					<option value='signals'>Señales</option>
				</select>
				<button disabled={isPending} className='btn btn-primary w-full'>
					{isPending && <span className='loading loading-spinner' />}
					Agregar foto
				</button>
			</section>
		</form>
	)
}
