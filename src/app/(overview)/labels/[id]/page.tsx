import { fetchLabelsById } from '@/lib/data/labels'
import PrintLabel from '@/components/labels/print-label'
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
