import ActivityCalendar from 'react-activity-calendar'

import { fetchData } from '@repo/api'

export default async function Page() {
	const data = await fetchData(
		process.env.WAKATIME!,
		new Date('2023-01-01'),
		new Date('2023-12-31'),
	)

	return (
		<main>
			<ActivityCalendar data={[]} />
		</main>
	)
}
