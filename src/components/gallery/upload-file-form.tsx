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
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }, [])

  const ImagesPreview = () => {
    return (
      <div className="grid h-64 w-full grid-cols-5 overflow-hidden rounded-md">
        {files.map(file => {
          return (
            <div className="relative " key={file.name}>
              <button
                className="btn btn-primary btn-circle btn-xs absolute right-1 top-2 text-white "
                onClick={() => {
                  setFiles(files.filter(f => f.name !== file.name))
                }}
              >
                <XIcon size={16} />
              </button>
              <img
                className="h-full w-full object-contain"
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

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragReject, isDragAccept } =
    useDropzone({
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
      <section className="flex flex-col gap-4">
        {files.length === 0 ? (
          <div {...getRootProps()}>
            <div className="bg-base-200 range-500 p-4">
              <label
                className={cn(
                  `bg-base-200 border-base-300 hover:bg-base-300 mb-2 flex h-64 w-full 
                    cursor-pointer items-center  justify-center rounded-[1.5rem] border-4 
                    border-dashed text-sm font-medium hover:border-zinc-600`,
                  {
                    'border-success': isDragAccept,
                    'border-error': isDragReject,
                  },
                )}
                htmlFor="file_input"
              >
                <div className="flex flex-col items-center p-8 text-zinc-600">
                  <div className="relative">
                    <span className="absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                      <PlusIcon className="text-primary" />
                    </span>
                    <ImageIcon className="h-14 w-14" />
                  </div>
                  {isDragActive ? (
                    <h4 className="mt-4 text-xl font-bold">Suelta tu archivo de imagen aqui ...</h4>
                  ) : (
                    <h4 className="mt-4 text-xl font-bold">
                      Arrastra y suelta las imagenes o <span className="text-primary">explora</span>
                    </h4>
                  )}
                  <p className="mt-2 text-center text-xs">
                    La imagen debe estar en formato JPEG, JPG, PNG
                  </p>
                </div>
                <input
                  {...getInputProps({})}
                  required
                  className="text-base-content border-base-300 bg-base-200 block w-full cursor-pointer rounded-lg border text-sm  focus:outline-none "
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                />
              </label>
            </div>
          </div>
        ) : (
          <ImagesPreview />
        )}
        <select
          defaultValue=""
          disabled={isPending}
          required
          name="category"
          className="select select-bordered"
        >
          <option value="" disabled>
            Elige una Categoría
          </option>
          {Object.entries(GALLERY_CATEGORIES).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            )
          })}
        </select>
        <select
          className="select select-bordered"
          defaultValue=""
          required
          disabled={isPending}
          name="folder"
        >
          <option value="" disabled>
            Selecciona una carpeta
          </option>
          <option value="gallery">Galeria</option>
          <option value="signals">Señales</option>
        </select>
        <button disabled={isPending} className="btn btn-primary w-full">
          {isPending && <span className="loading loading-spinner" />}
          Agregar foto
        </button>
      </section>
    </form>
  )
}
