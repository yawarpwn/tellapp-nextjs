'use client'
import { useDropzone } from 'react-dropzone'

export function Test() {
	const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
		useDropzone()
	console.log('render test')
	return (
		<form>
			<div {...getRootProps()}>
				<label>
					<div>Subir archivos</div>
					<input {...getInputProps()} />
				</label>
			</div>
		</form>
	)
}
