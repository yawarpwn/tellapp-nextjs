import {
	CustomersIcon,
	PrinterIcon,
	ProductsIcon,
	QuotationIcon,
	TruckIcon,
} from '@/icons'

export const ROW_PER_PAGE = 6
export const CATEGORIES = {
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
}

export const ITEMS_PER_PAGE = 8

export const NAVIGATION = [
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
