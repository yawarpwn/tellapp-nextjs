import { Button } from '@/components/ui/button'
import { EmpetyIcon } from '@/icons'

export function NoResult() {
	return (
		<div className='flex flex-col gap-4 items-center'>
			<EmpetyIcon className='w-20 h-20 mt-16' />
			<h2 className='py-8 text-xl'>Sin Produtos agregados</h2>
		</div>
	)
}
