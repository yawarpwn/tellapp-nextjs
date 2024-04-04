import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createInfoQuo, type QuoInfoState } from './quos/create-info-quo'
import { createItemsQuo, type QuoItemsState } from './quos/create-items-quo'
import { createStepQuo, type QuoStep } from './quos/create-step-quo'

const useQuoStore = create<
	& QuoInfoState
	& QuoStep
	& QuoItemsState
>()(persist((...args) => ({
	...createInfoQuo(...args),
	...createStepQuo(...args),
	...createItemsQuo(...args),
}), {
	name: 'Quo',
}))

export { useQuoStore }
