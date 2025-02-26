export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.tellsignals.workers.dev'
    : 'http://localhost:8787'

export const QUOTATION_LOCALSTORAGE_NAME = 'TELL_QUO'
import {
  CustomersIcon,
  GalleryIcon,
  PrinterIcon,
  ProductsIcon,
  QuotationIcon,
  SignalIcon,
  TruckIcon,
  FolderDownIcon,
} from '@/icons'

export const TABLES = {
  Quotations: 'quotations',
  Products: 'products',
  Signals: 'signals',
  Customers: 'customers',
  Gallery: 'gallery',
  Agencies: 'agencies',
  Labels: 'labels',
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
  CONVENCIONALES: 'convencionales',
  ACRILICOs: 'acrilicos',
} as const

export const PRODUCT_CATEGORIES_BY_ID = {
  'cintas seguridad': 1,
  obras: 2,
  'proteccion vial': 3,
  fotoluminiscente: 4,
  seguridad: 5,
  viales: 6,
  viniles: 7,
  'lucha contra incendio': 8,
  'articulos seguridad': 9,
  epp: 10,
  servicio: 11,
  'ropa seguridad': 12,
  convencionales: 13,
  acrilicos: 14,
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
  // {
  //   title: 'Clientes',
  //   href: '/new-customers',
  //   icon: CustomersIcon,
  // },
  {
    title: 'Rotulos',
    href: '/new-labels',
    icon: PrinterIcon,
  },
  {
    title: 'Agencias',
    href: '/new-agencies',
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
  {
    title: 'Marcas',
    href: '/watermark',
    icon: FolderDownIcon,
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
  Viales: 'viales',
  Seguridad: 'seguridad',
  Decorativas: 'decorativas',
  Obras: 'obras',
  Fotoluminiscentes: 'fotoluminicentes',
} as const
