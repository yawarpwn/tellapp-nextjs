'use client'
import {
	type CustomerType,
	type ProductType,
	type QuotationCreateType,
	type QuotationItemType,
	type QuotationType,
	type QuotationUpdateType,
} from '@/types'
import React from 'react'

type QuotationContextValues = {
	quo: QuotationCreateType
	items: QuotationItemType[]
	products: ProductType[]
	customers: CustomerType[]
	setQuo: (quo: Partial<QuotationCreateType>) => void
	setItems: (items: QuotationItemType[]) => void
}

export const QuotationContext = React.createContext<
	QuotationContextValues | null
>(
	null,
)

interface QuoStoreProviderProps {
	children: React.ReactNode
	initialCustomers: CustomerType[]
	initialProducts: ProductType[]
	initialQuo?: QuotationType
	initialItems?: QuotationItemType[]
}

export const QuoStoreProvider = (
	props: QuoStoreProviderProps,
) => {
	const { initialQuo, initialItems, initialCustomers, initialProducts } = props
	const [quo, updateQuo] = React.useState<QuotationCreateType>(
		initialQuo || {
			ruc: '',
			company: '',
			address: '',
			deadline: 1,
			include_igv: true,
			is_regular_customer: false,
		},
	)

	const [items, updateItems] = React.useState<QuotationItemType[]>(
		initialItems || [],
	)
	const [products] = React.useState<ProductType[]>(initialProducts)
	const [customers] = React.useState<CustomerType[]>(initialCustomers)

	const setQuo = (quoToUpdate: Partial<QuotationCreateType>) => {
		updateQuo({
			...quo,
			...quoToUpdate,
		})
	}

	const setItems = (items: QuotationItemType[]) => {
		updateItems(items)
	}

	return (
		<QuotationContext.Provider
			value={{
				quo,
				setQuo,
				items,
				setItems,
				products,
				customers,
			}}
		>
			{props.children}
		</QuotationContext.Provider>
	)
}

export const useQuotationContext = () => {
	const context = React.useContext(QuotationContext)

	if (!context) {
		throw new Error('useQuoStore must be used within a QuoStoreProvider')
	}

	return context
}
