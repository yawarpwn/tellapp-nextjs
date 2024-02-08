'use client'
import { uploadFile } from '@/lib/actions/gallery'
import { useDropzone } from 'react-dropzone'
// import { useState } from 'react'
export function UploadFilesForm() {
	const onDrop = (acceptedFiles) => {
		console.log(acceptedFiles)
		uploadFile.bind(null, acceptedFiles)
	}
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})
	return (
		<>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive
					? <p>Drop the files here</p>
					: <p>Dran n some files or click to select files</p>}
			</div>
			{/* <form action={uploadFile}> */}
			{/* 	<input name='file' type='file' multiple /> */}
			{/* 	<button>Enviar</button> */}
			{/* </form> */}
		</>
	)
}
