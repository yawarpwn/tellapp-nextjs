import {
	BearContext,
	BearProps,
	BearState,
	BearStore,
	createBearStore,
} from '@/store/bears'
import React from 'react'
import { useStore } from 'zustand'

export function useBearStore() {
	const store = React.useContext(BearContext)

	return store
}

type BearProviderProps = React.PropsWithChildren<BearProps>

export function BearStoreProvider({ children, ...props }: BearProviderProps) {
	const storeRef = React.useRef<BearStore>()
	if (!storeRef.current) {
		storeRef.current = createBearStore(props)
	}

	return (
		<BearContext.Provider value={storeRef.current}>
			{children}
		</BearContext.Provider>
	)
}

export function useBearContext<T>(selector: (state: BearState) => T): T {
	const store = React.useContext(BearContext)
	if (!store) throw new Error('Missing BearContext.Provider in the tree')

	return useStore(store, selector)
}
