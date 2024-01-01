import { deleteRow as deleteRowFn, insertRow as insertRowFn, updateRow as updateRowFn } from '@/services/supabase'
import { useEffect, useState } from 'react'

import { createBrowserClient } from '@/lib/supabase'

export function useRealTime({ initialData, table = 'quotations' }) {
	const [rows, setRows] = useState(initialData)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const supabase = createBrowserClient()

	const deleteRow = async id => {
		try {
			setLoading(true)
			await deleteRowFn({ table, id, client: supabase })
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	const updateRow = async rowToUpdate => {
		try {
			setLoading(true)
			await updateRowFn({ table, row: rowToUpdate, client: supabase })
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	const insertRow = async rowToInsert => {
		try {
			setLoading(true)
			await insertRowFn({ table, row: rowToInsert, client: supabase })
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const TYPE = {
			INSERT: 'INSERT',
			UPDATE: 'UPDATE',
			DELETE: 'DELETE',
		}

		const handleSubscription = payload => {
			if (payload.eventType === TYPE.INSERT) {
				setRows(quotations => [...quotations, payload.new])
			}

			if (payload.eventType === TYPE.DELETE) {
				setRows(prevQuos => {
					const quosToUpdate = prevQuos.filter(q => q.id !== payload.old.id)
					return quosToUpdate
				})
			}

			if (payload.eventType === TYPE.UPDATE) {
				setRows(quotations => quotations.map(quotation => (quotation.id === payload.new.id ? payload.new : quotation)))
			}
		}

		const channel = supabase
			.channel('*')
			.on('postgres_changes', { event: '*', schema: 'public', table }, handleSubscription)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase, setRows, rows, table])

	return {
		rows,
		error,
		loading,
		deleteRow,
		insertRow,
		updateRow,
	}
}
