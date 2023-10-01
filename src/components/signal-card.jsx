'use client'

import Button from '@/components/button'
  import { useState } from 'react'

function SignalCard({ signal }) {
  const [editing, setEditing] = useState(false)
  const { id, title, code, category, image } = signal

  const handleEdit = () => {
    setEditing(true)
  }

  return (
    <div className="max-w-sm border rounded">
      <h1>Editing: {String(editing)}</h1>
      <div>
        <img src={image.url} />
      </div>
      <div className="px-5 pb-5">
        <h5>{title}</h5>
        <div>
          <span>{code}</span>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      </div>
    </div>
  )
}

export default SignalCard
