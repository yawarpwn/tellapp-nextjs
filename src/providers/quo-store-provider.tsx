'use client'
import { type CustomerType } from '@/types'
import React from 'react'
import { type StoreApi, useStore } from 'zustand'

import { createQuoStore, type QuoStore } from '@/store/quo-store'

export const QuoStoreContext = React.createContext<StoreApi<QuoStore> | null>(
	null,
)

interface QuoStoreProviderProps {
	children: React.ReactNode
	customers: CustomerType[]
}

export const QuoStoreProvider = (
	props: QuoStoreProviderProps,
) => {
	const storeRef = React.useRef<StoreApi<QuoStore>>()
	if (!storeRef.current) {
		storeRef.current = createQuoStore({ customers: props.customers, step: 1 })
	}
	return (
		<QuoStoreContext.Provider value={storeRef.current}>
			{props.children}
		</QuoStoreContext.Provider>
	)
}

export const useQuoStore = <T,>(
	selector: (store: QuoStore) => T,
): T => {
	const quoStoreContext = React.useContext(QuoStoreContext)

	if (!quoStoreContext) {
		throw new Error('useQuoStore must be used within a QuoStoreProvider')
	}

	return useStore(quoStoreContext, selector)
}
