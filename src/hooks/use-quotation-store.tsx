'use client'

import {
	createQuotationStore,
	QuotationContext,
	type QuotationProps,
	type QuotationState,
	type QuotationStore,
} from '@/store/quos'
import React from 'react'
import { useStore } from 'zustand'

export function useQuotationStore() {
	const store = React.useContext(QuotationContext)
	return store
}

type QuotationProviderProps = React.PropsWithChildren<QuotationProps>

export function QuotationStoreProvider(
	{ children, ...props }: QuotationProviderProps,
) {
	const storeRef = React.useRef<QuotationStore>()
	if (!storeRef.current) {
		storeRef.current = createQuotationStore(props)
	}

	return (
		<QuotationContext.Provider value={storeRef.current}>
			{children}
		</QuotationContext.Provider>
	)
}

export function useQuotationContext<T>(
	selector: (state: QuotationState) => T,
): T {
	const store = React.useContext(QuotationContext)
	if (!store) throw new Error('Missing QuotationContext.Provider in the tree')

	return useStore(store, selector)
}
