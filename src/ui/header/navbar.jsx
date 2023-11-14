import Login from './login'
import Link from 'next/link'

import {
  ProductsIcon,
  PrinterIcon,
  QuotationIcon,
  CustomersIcon,
  TruckIcon
} from '@/icons'

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
    <div className="navbar max-w-3xl mx-auto">
      <nav className="flex-1">
        <ul className="menu menu-sm menu-horizontal rounded-box">
          {navs.map(({ href, title, icon: Icon }) => (
            <li key={title} >
              <Link href={href}>
                <Icon />
                <span className="hidden md:block">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Login />
    </div>
  )
}

export default Navbar
