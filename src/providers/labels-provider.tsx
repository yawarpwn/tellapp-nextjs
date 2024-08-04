'use client'

import React, { useState, useContext, createContext } from 'react'
import type { Agency } from '@/schemas'

const LabelContext = createContext<{ agencies: Agency[] } | undefined>(undefined)

export function useLabels() {
  const labelsContext = useContext(LabelContext)

  if (!labelsContext)
    throw new Error('useQuotationCreateStore must be used within CounterStoreProvider')

  return labelsContext
}

interface Props {
  children: React.ReactNode
  agencies: Agency[]
}
export function LabelsProvider({ children, agencies }: Props) {
  return (
    <LabelContext.Provider
      value={{
        agencies: agencies,
      }}
    >
      {children}
    </LabelContext.Provider>
  )
}
