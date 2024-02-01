import ActivityCalendar from 'react-activity-calendar'

import { fetchData, type DayStatistics } from '@repo/api'
import { Interner } from './interner'

export default async function Page() {
	const data = await fetchData(
		process.env.WAKATIME!,
		new Date('2023-01-01'),
		new Date('2023-12-31'),
	)

	const interner = new Interner()

	interner.bulkInsert(
		(
			(await (
				await fetch(
					'https://github.com/abiriadev/wakatime-colors/raw/main/colors.json',
				)
			).json()) as Array<{
				name: string
				color: string
			}>
		).reduce(
			(
				p: Record<string, string>,
				{ name, color },
			) => ((p[name] = color), p),
			{},
		),
	)

	const palette = interner.dumpValues()

	const excludes = ['Other']

	const findLevelFromLanguages = (
		langs: DayStatistics['langs'],
	): number => {
		const l = langs.filter(
			({ name }) => !excludes.includes(name),
		)[0]

		return l === undefined
			? 0
			: interner.lookup(l.name) ?? 0
	}

	return (
		<main>
			<ActivityCalendar
				data={data.map(({ date, langs }) => ({
					date,
					level: findLevelFromLanguages(langs),
					count: 1,
				}))}
				maxLevel={palette.length - 1}
				theme={{
					light: palette,
					dark: palette,
				}}
			/>
		</main>
	)
}
