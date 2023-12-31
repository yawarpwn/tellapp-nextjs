import { fetchLabelsById } from '@/lib/labels-data'
import React from 'react'
import PrintLabel from '@/ui/labels/print-label'

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
