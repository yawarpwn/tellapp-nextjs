import { Sidebar } from '@/components/sidebar'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
interface Props {
  showMobileMenu: boolean
  onCloseMobileMenu: () => void
}
export function MobileSidebar(props: Props) {
  const { showMobileMenu, onCloseMobileMenu } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
      setVisible(true)
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showMobileMenu])

  const closeModal = () => {
    setVisible(false)
    setTimeout(() => {
      onCloseMobileMenu()
    }, 300)
  }
  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-[100vw] justify-center">
      <div
        role="dialog"
        id="modal-mobile "
        className={cn(
          'fixed bottom-0 left-0 top-0 w-full translate-x-0 transition-transform duration-300 ease-in-out ',
          visible ? 'translate-x-0' : 'translate-x-[-100%]',
        )}
      >
        <Sidebar onClose={closeModal} />
      </div>
    </div>
  )
}
