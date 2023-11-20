import Link from 'next/link'

import {
  ProductsIcon,
  PrinterIcon,
  QuotationIcon,
  CustomersIcon,
  TruckIcon,
} from '@/icons'
import SignOutButton from '../sign-out-button'

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
    <div className="navbar max-w-3xl mx-auto flex justify-between">
      <nav className="flex-1 ">
        <ul className="menu flex-row  menu-sm rounded-box">
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
      <SignOutButton />
    </div>
  )
}

export default Navbar
