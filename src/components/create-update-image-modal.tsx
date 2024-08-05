import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { cn } from '@/lib/utils'
import type { GalleryImage, Signal } from '@/types'
import { ImageIcon, PlusIcon } from 'lucide-react'
import React, { useState, useTransition } from 'react'

interface Props {
  item?: Signal | GalleryImage
  onCloseModal: () => void
  isOpenModal: boolean
  action: (formData: FormData) => Promise<void>
  categories: string[]
  isEditMode: boolean
  type?: 'signal' | 'gallery'
  modalTitle?: string
}
export function CreateUpdateImageModal({
  item,
  onCloseModal,
  isOpenModal,
  action,
  categories,
  isEditMode,
  modalTitle,
  type = 'signal',
}: Props) {
  const [isPending, startTransition] = useTransition()
  const [imageUrl, setImageUrl] = useState<string | null>(item?.url ?? null)

  const getIsSignal = (item?: Signal | GalleryImage): item is Signal => {
    if (!item) return false
    return 'code' in item
  }

  const isSignal = getIsSignal(item)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const file = formData.get('fileImage') as File

    if (file && !file.name) {
      formData.delete('fileImage')
    }

    startTransition(async () => {
      await action(formData)
      onCloseModal()
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      // Esta función se ejecuta cuando la lectura del archivo se completa
      reader.onload = () => {
        setImageUrl(reader.result as string) // Establece la URL de la imagen en el estado
      }
      reader.readAsDataURL(file) // Lee el archivo como una URL de datos
    }
  }

  const clearImage = () => {
    setImageUrl(null)
  }

  return (
    <Modal title={modalTitle} isOpen={isOpenModal} onClose={onCloseModal}>
      <form onSubmit={handleSubmit}>
        {isEditMode && (
          <>
            <input name="id" type="hidden" value={item?.id} />
            <input name="publicId" type="hidden" value={item?.public_id} />
          </>
        )}
        <div className="grid grid-cols-12 gap-4">
          <div className="bg-base-200 relative col-span-12 flex justify-center p-4">
            <div className="h-[250px] w-full">
              {imageUrl && (
                <>
                  <button
                    onClick={clearImage}
                    className="btn  absolute right-0 top-0"
                    type="button"
                  >
                    Eliminar
                  </button>
                  <img className="h-full w-full object-contain p-4" src={imageUrl} />
                </>
              )}
              <div
                className={cn(
                  `h-full w-full items-center justify-center`,
                  imageUrl ? 'hidden' : 'flex',
                )}
              >
                <label
                  className={`
										bg-base-200 border-base-300 hover:bg-base-300 mb-2 flex h-64 w-full 
                    cursor-pointer items-center  justify-center rounded-[1.5rem] border-4 
                    border-dashed text-sm font-medium hover:border-zinc-600
`}
                >
                  <div className="flex flex-col items-center p-8 text-zinc-600">
                    <div className="relative">
                      <span className="absolute -left-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                        <PlusIcon className="text-primary" />
                      </span>
                      <ImageIcon className="h-14 w-14" />
                    </div>
                    <h4 className="mt-4 text-xl font-bold">
                      Arrastra y suelta las imagenes o <span className="text-primary">explora</span>
                    </h4>
                    <p className="mt-2 text-center text-xs">
                      La imagen debe estar en formato JPEG, JPG, PNG
                    </p>
                  </div>
                  <input
                    className="hidden"
                    name="fileImage"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <Input
              labelText="Nombre"
              required
              name="title"
              placeholder="Descripcion de signalo"
              defaultValue={item?.title ?? ''}
              ariaLabelledby={'description-error'}
            />
          </div>
          {type === 'signal' && (
            <div className="col-span-12">
              <Input
                required
                name="code"
                labelText="Codigo"
                type="text"
                defaultValue={item?.code ?? ''}
                placeholder="XVX60"
                ariaLabelledby={'code-error'}
              />
            </div>
          )}
          <div className="col-span-12 flex items-center justify-between">
            <select
              id="category"
              name="category"
              className="select w-full"
              defaultValue={item?.category ?? ''}
              required
            >
              <option value="" disabled>
                Selectionar una Categoria
              </option>
              {categories.map(value => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-between gap-2">
          <button disabled={isPending} type="submit" className="btn btn-outline ">
            <span>Aceptar</span>
            {isPending && <span className="loading loading-spinner"></span>}
          </button>
          <button
            disabled={isPending}
            type="button"
            onClick={onCloseModal}
            className="btn  btn-outline "
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  )
}
