'use client'
import { useState, useEffect } from "react"

function RealtimeQuotation({ serverQuotation}) {
  const [quotation, setQuotation] = useState(serverQuotation)
  return (
  <pre>{JSON.stringify(quotation, null, 2)}</pre>
  )
}

export default RealtimeQuotation
