interface Props {
	stepNumber: number
	title: string
}
export function Step({
	stepNumber = 1,
	title = '',
}: Props) {
	return (
		<section>
			<p>
				{stepNumber}
			</p>
		</section>
	)
}
