export const QUOTATION_LOCALSTORAGE_NAME = 'TELL_QUO'

import {
  CustomersIcon,
  GalleryIcon,
  PrinterIcon,
  ProductsIcon,
  QuotationIcon,
  SignalIcon,
  TruckIcon,
} from '@/icons'

export const TABLES = {
  Quotations: 'quotations',
  Products: 'products',
  Signals: 'signals',
  Customers: 'customers',
  Gallery: 'gallery',
} as const

export const ROW_PER_PAGE = 6

export const PRODUCT_CATEGORIES = {
  CINTAS_SEGURIDAD: 'cintas seguridad',
  OBRAS: 'obras',
  PROTECCION_VIAL: 'proteccion vial',
  FOTOLUMINISCENTE: 'fotoluminiscente',
  SEGURIDAD: 'seguridad',
  VIALES: 'viales',
  VINILES: 'viniles',
  LUCHA_CONTRA_INCENDIO: 'lucha contra incendio',
  ARTICULOS_SEGURIDAD: 'articulos seguridad',
  EPP: 'epp',
  SERVICIO: 'servicio',
  ROPA_SEGURIDAD: 'ropa seguridad',
} as const

export const ITEMS_PER_PAGE = 12

export const NAVIGATION = [
  {
    title: 'Cotizaciones',
    href: '/new-quos',
    icon: QuotationIcon,
  },
  {
    title: 'Productos',
    href: '/new-products',
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

  {
    title: 'Galeria',
    href: '/gallery',
    icon: GalleryIcon,
  },
  {
    title: 'Señales',
    href: '/signals',
    icon: SignalIcon,
  },
]

export const GALLERY_CATEGORIES = {
  SenalesViales: 'Señales Viales',
  SenalesObras: 'Señales Obras',
  SenalesConvencionales: 'Señales Convencionales',
  SenalesFotoluminiscentes: 'Señales fotoluminiscentes',
  SenalesDecorativas: 'Señales Decorativas',
  SenalesReflectivas: 'Señales Reflectivas',
  SenalesMineria: 'Señales Minería',
  SenalesAcrilico: 'Señales Acrílico',
  LaminasReflectivas: 'Láminas reflectivas',
  RotulosStickers: 'Rótulos y stickers',
  Plantillas: 'Plantillas',
} as const

export const SIGNALS_CATEGORIES = {
  viales: 'Viales',
  seguridad: 'Seguridad',
  decorativas: 'Decorativas',
  obras: 'Obras',
  fotoluminiscentes: 'Fotoluminicentes',
} as const
