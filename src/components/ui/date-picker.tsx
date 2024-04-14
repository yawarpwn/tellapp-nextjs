'use client'

import { Label } from '@/components/ui/label'
import { formatDateToLocal } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DatePicker() {
	const today = new Date()
	const [date, setDate] = React.useState<Date>(today)

	return (
		<Popover>
			<div className='grid gap-2'>
				<Label>Fecha</Label>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn(
							'w-full justify-start text-left font-normal',
							!date && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date
							? formatDateToLocal(date, undefined, {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})
							: <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
			</div>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
