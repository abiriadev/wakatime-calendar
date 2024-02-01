import ActivityCalendar from 'react-activity-calendar'

import { fetchData } from '@repo/api'
import { Interner } from './interner'

export default async function Page() {
	console.log(process.env.WAKATIME)

	const data = await fetchData(
		process.env.WAKATIME!,
		new Date('2023-01-01'),
		new Date('2023-12-31'),
	)

	const interner = new Interner()

	interner.bulkInsert(
		(await (
			await fetch(
				'https://github.com/abiriadev/wakatime-colors/raw/main/colors.json',
			)
		).json()) as Record<string, string>,
	)

	const palette = interner.dumpValues()

	return (
		<main>
			<ActivityCalendar
				data={data.map(({ date, lang }) => ({
					date,
					level:
						lang === null
							? 0
							: interner.lookup(lang) ?? 0,
					count: 1,
				}))}
				theme={{
					light: palette,
					dark: palette,
				}}
			/>
		</main>
	)
}
