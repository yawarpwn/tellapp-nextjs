'use client'
import PrintLabel from '@/ui/components/print-label'
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import LabelsTable from './table'

function Labels({ labels }) {
	const [labelToPrint, setLabelToPrint] = useState(null)
	const componentRef = useRef()

	const print = useReactToPrint({
		content: () => componentRef.current,
	})

	useEffect(() => {
		if (labelToPrint) {
			print()
		}
	}, [labelToPrint, print])

	const handlePrint = label => {
		setLabelToPrint(label)
	}

	return (
		<>
			<LabelsTable onPrint={handlePrint} labels={labels} />
			{labelToPrint && (
				<div style={{ display: 'none' }}>
					<PrintLabel label={labelToPrint} containerRef={componentRef} />
				</div>
			)}
		</>
	)
}

export default Labels
