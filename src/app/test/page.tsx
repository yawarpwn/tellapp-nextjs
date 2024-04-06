'use client'
import React from 'react'
import { BearStoreProvider, useBearContext } from './use-bear-store'

function App() {
	const bears = useBearContext(s => s.bears)
	const addBear = useBearContext(s => s.addBear)

	return (
		<div>
			{bears}
			<div>
				<button onClick={addBear}>add</button>
			</div>
		</div>
	)
}

export default function PageTest() {
	return (
		<BearStoreProvider bears={20}>
			<App />
		</BearStoreProvider>
	)
}
