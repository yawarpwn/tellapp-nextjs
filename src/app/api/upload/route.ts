import { uploadImageFile } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const path = req.nextUrl.searchParams.get('path')
	try {
		const formData = await req.formData()
		const files = formData.getAll('files') as File[]
		const category = formData.get('category') as string
		const folder = formData.get('folder') as string

		const promises = files.map(async file => {
			return uploadImageFile(file, { category, folder })
		})

		await Promise.all(promises)

		if (path) {
			revalidatePath(path)
		}
		return NextResponse.json({
			success: true,
			message: 'Imagenenes insertadas correctamente',
		}, {
			status: 200,
		})
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Error al subir imagen',
			},
			{
				status: 500,
			},
		)
	}
}
