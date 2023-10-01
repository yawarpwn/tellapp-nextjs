'use client'
import { useEffect } from "react";


function Modal({ children}) {

  useEffect(() => {

  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="bg-black/10 w-ful h-full">
        {children}
      </div>
    </div>
  )
}

export default Modal
