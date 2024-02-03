'use client'
import { uploadFile } from '@/lib/actions/gallery'
import { useState } from 'react'
export function UploadFilesForm() {
	const [files, setFiles] = useState([])

	const handleSubmit = (event) => {
		event.preventDefault()
		uploadFile(files)
	}

	const handleChange = (event) => {
		for (const file of event.target.files) {
			setFiles(prevFiles => [...prevFiles, file])
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input onChange={handleChange} name='file' type='file' multiple />
			<button>Enviar</button>
		</form>
	)
}
