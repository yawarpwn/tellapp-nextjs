import { useQuoStore } from '@/store/quos'
import React from 'react'
interface Props {
  children: React.ReactNode
  onNextStep?: () => void
  onPreviousStep?: () => void
}
export function StepContainer(props: Props) {
  const { onNextStep, onPreviousStep, children } = props
  const { step } = useQuoStore(state => state)
  return (
    <section>
      {children}
      <footer className="mt-4 flex justify-between">
        {step > 1 && (
          <button className="btn" onClick={onPreviousStep}>
            Anterior
          </button>
        )}
        {step === 2 ? (
          <button className="btn" onClick={onNextStep}>
            Aceptar
          </button>
        ) : (
          <button className="btn" onClick={onNextStep}>
            Siguiente
          </button>
        )}
      </footer>
    </section>
  )
}
