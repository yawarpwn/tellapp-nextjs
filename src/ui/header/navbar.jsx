import Link from 'next/link'

import {
  ProductsIcon,
  PrinterIcon,
  QuotationIcon,
  CustomersIcon,
  TruckIcon,
} from '@/icons'
import SignOutButton from '../sign-out-button'
import TellLogo from '../components/tell-logo'

const navs = [
  {
    title: 'Cotizaciones',
    href: '/quotations',
    icon: QuotationIcon,
  },
  {
    title: 'Productos',
    href: '/products',
    icon: ProductsIcon,
  },

  {
    title: 'Clientes',
    href: '/customers',
    icon: CustomersIcon,
  },
  {
    title: 'Rótulos',
    href: '/labels',
    icon: PrinterIcon,
  },
  {
    title: 'Agencias',
    href: '/agencies',
    icon: TruckIcon,
  },
]
function Navbar() {
  return (
    <header className="mb-4">
      <div className="navbar bg-base justify-between">
        <Link href={'/'} className="btn btn-ghost gap-2">
          <TellLogo compact={true} />
        </Link>
        <SignOutButton />
      </div>
      <nav className="overflow-x-auto sticky ">
        <ul className="menu menu-horizontal flex-nowrap bg-base-200  rounded-box">
          {navs.map(({ href, title, icon: Icon }) => (
            <li key={title}>
              <Link href={href}>
                <Icon />
                <span className="hidden md:block">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
