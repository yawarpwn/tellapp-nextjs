import { fetchLabelsById } from '@/lib/labels-data'
import PrintLabel from '@/ui/labels/print-label'
import React from 'react'

async function LabelIdPage({ params }) {
	const id = params?.id
	const label = await fetchLabelsById({ id })

	return (
		<>
			<PrintLabel label={label} />
		</>
	)
}

export default LabelIdPage
