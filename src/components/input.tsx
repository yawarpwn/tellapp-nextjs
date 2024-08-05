import { cn } from '@/lib/utils'
import { useId } from 'react'
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string
  inputRef?: any
  errors?: any
  ariaLabelledby?: string
  disabled?: boolean
}
export function Input(props: Props) {
  const { labelText, inputRef, errors, ariaLabelledby, disabled, ...restProps } = props

  const id = useId()
  return (
    <div className="grid grid-cols-12 gap-2 text-sm">
      <div className="col-span-12 flex flex-row justify-between">
        <label className="text-base-content/70 block" htmlFor={id}>
          {labelText}
        </label>
      </div>
      <div className="col-span-12">
        <div>
          <div className="relative">
            <input
              id={id}
              ref={inputRef}
              aria-labelledby={ariaLabelledby}
              className={cn(
                `bg-base-200 border-base-300 placeholder:text-base-content/50  input-form block w-full rounded-md border 
px-4  py-3 text-sm 
outline-none
focus-visible:border-primary
`,
                errors && 'bg-base-300 border-red-900',
              )}
              disabled={disabled}
              {...restProps}
            />
          </div>
        </div>

        {/* handle Error */}
        {errors?.map((error: any) => (
          <div
            id={ariaLabelledby}
            aria-live="polite"
            className="text-error mt-1 text-xs"
            key={error}
          >
            {error}
          </div>
        ))}
      </div>
    </div>
  )
}
