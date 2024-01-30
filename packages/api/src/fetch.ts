import ky from 'ky'

export interface RawData {
	data: Array<{
		languages: Array<{
			name: string
		}>
		range: {
			date: string
		}
	}>
}

export interface DayStatistics {
	date: string
	lang: string | null
}

export const fetchData = async (
	key: string,
	start: Date,
	end: Date,
): Promise<Array<DayStatistics>> =>
	ky
		.get(
			'http://wakatime.com/api/v1/users/current/summaries',
			{
				searchParams: {
					start: start.toString(),
					end: end.toString(),
				},
				headers: {
					Authorization: `Basic ${btoa(key)}`,
				},
			},
		)
		.json<RawData>()
		.then(d =>
			d.data.map(
				({ languages, range: { date } }) => ({
					date,
					lang: languages[0]?.name ?? null,
				}),
			),
		)
