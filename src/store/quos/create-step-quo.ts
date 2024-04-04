import { StateCreator } from 'zustand'

type QuoStep = {
	step: number
	increaseStep: (step: number) => void
	decreaseStep: (step: number) => void
}

const createStepQuo: StateCreator<QuoStep> = (set) => ({
	step: 1,
	increaseStep: (step) => set((state) => ({ ...state, step: step + 1 })),
	decreaseStep: (step) => set((state) => ({ ...state, step: step - 1 })),
})

export {
	createStepQuo,
	type QuoStep,
}
