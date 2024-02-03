'use client'
import { Uppy } from '@uppy/core'
import { Dashboard } from '@uppy/react'
import Tus from '@uppy/tus'
import { useState } from 'react'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

export function UploadFileForm() {
	const [uppy] = useState(() =>
		new Uppy().use(Tus, {
			endpoint: process.env.NEXT_PUBLIC_SUPABASE_URL
				+ '/storage/v1/upload/resumable',
			headers: {
				authorization: 'Bearer ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
				'x-upsert': 'true',
			},
			uploadDataDuringCreation: true,
			chunkSize: 6 * 1024 * 1024,
			allowedMetaFields: [
				'bucketName',
				'objectName',
				'contentType',
				'cacheControl',
			],
			onError: function(error) {
				console.log('Failed because: ' + error)
			},
		})
	)

	console.log(uppy)

	// uppy.on('file-added', (file) => {
	// 	file.meta = {
	// 		...file.meta,
	// 		bucketName: 'gallery',
	// 		contentType: file.type,
	// 	}
	// })
	//
	// uppy.on('complete', result => {
	// 	console.log(
	// 		'Upload complete! We’ve uploaded these files:',
	// 		result.successful,
	// 	)
	// })

	// uppy.on('upload-success', () => {
	//    console.log(k)
	// 	uppy.cancelAll()
	// 	// if (inputRef.current) {
	// 	// 	inputRef.current.value = "";
	// 	// }
	// 	// document.getElementById("trigger-close")?.click();
	// 	// router.refresh();
	// })

	const handleUpload = () => {
		if (uppy.getFiles().length !== 0) {
			uppy.upload()
		}
	}

	return (
		<>
			<Dashboard uppy={uppy} hideUploadButton />
			<button onClick={handleUpload}>Enviar</button>
		</>
	)
}
