'use client'

import { useSearch } from '@/hooks/use-search'
import { ProductType } from '@/types'
import { XIcon } from 'lucide-react'
import React from 'react'
import { Input } from './input'
import { Textarea } from './textarea'

import { useQuotationCreateStore } from '@/hooks/use-quotation-store'

const initialState = {
  price: 0,
  qty: 0,
  description: '',
  cost: 0,
  unit_size: '',
}

export function QuotationItemForm() {
  const products = useQuotationCreateStore(state => state.products)
  return <div>{JSON.stringify(products)}</div>
}
