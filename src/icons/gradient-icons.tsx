export function GradientIcons({ id }: { id: string }) {
	return (
		<>
			<defs>
				<linearGradient
					id={id}
					x1='-9.46'
					y1='-2.14614e-06'
					x2='22.5723'
					y2='-10.1234'
					gradientUnits='userSpaceOnUse'
				>
					<stop offset='0.0001' stopColor='#FA5560'></stop>
					<stop offset='0.499028' stopColor='#B14BF4'></stop>
					<stop offset='1' stopColor='#4D91FF'></stop>
				</linearGradient>
			</defs>
		</>
	)
}
