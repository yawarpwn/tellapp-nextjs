'use client'

import { useEffect, useState } from "react"

function ProgressBar() {
  const [progress, setProgress] = useState(0)
useEffect(() => {
  const interval =  setInterval(() => {
    setProgress((prevProgress) => {
      prevProgress >= 100 ? 0 : prevProgress + 10
    })
  }, 600) 
}, [])
  return (
    <div>ProgressBar</div>
  )
}

export default ProgressBar

