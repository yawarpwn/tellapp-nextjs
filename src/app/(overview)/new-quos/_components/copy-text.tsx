'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const CHARS = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
  Á: 'A',
  É: 'E',
  Í: 'I',
  Ó: 'O',
  Ú: 'U',
  ñ: 'n',
  Ñ: 'N',
  Ø: '',
}

const INIT_MESSAGE = 'Copiar'

export function CopyText({ text }: { text: string }) {
  const [message, setMessage] = useState(INIT_MESSAGE)
  const [open, setOpen] = useState(false)

  const handleCopy = () => {
    const cleanText = text
      .replace(/[áéíóúÁÉÍÓÚñÑ]/g, match => CHARS[match])
      .replace(/"/g, ' pulgadas')
      .replace(/[^a-zA-Z0-9 =.:(),/-]/g, '')
      .toUpperCase()

    navigator.clipboard
      .writeText(cleanText)
      .then(() => {
        setMessage('Copiado')
        setOpen(true)
      })
      .catch(() => {
        setMessage('Error')
      })
  }

  useEffect(() => {
    if (message !== INIT_MESSAGE) {
      const timeId = setTimeout(() => {
        setMessage(INIT_MESSAGE)
      }, 3000)
      return () => clearTimeout(timeId)
    }
  }, [message])

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button onClick={handleCopy}>{text}</button>
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            message === INIT_MESSAGE
              ? 'bg-foreground text-background'
              : 'bg-primary text-primary-foreground',
          )}
        >
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
