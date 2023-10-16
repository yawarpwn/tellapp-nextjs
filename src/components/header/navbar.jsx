import Login from './login'
import Link from 'next/link'

import {
  ProductsIcon,
  PrinterIcon,
  QuotationIcon,
  CustomersIcon,
} from '@/icons'

const navs = [
  {
    title: 'Cotizaciones',
    href: '/',
    icon: QuotationIcon,
  },
  {
    title: 'Productos',
    href: '/products',
    icon: ProductsIcon,
  },

  {
    title: 'Clientes',
    href: '/clientes',
    icon: CustomersIcon,
  },
  {
    title: 'Rotulos',
    href: '/rotulos',
    icon: PrinterIcon,
  },
]
function Navbar() {
  return (
    <div className="navbar ">
      <nav className="flex-1">
        <ul className="menu menu-horizontal rounded-box">
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
