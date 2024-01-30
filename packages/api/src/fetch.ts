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
			'https://wakatime.com/api/v1/users/current/summaries',
			{
				searchParams: {
					start: start
						.toISOString()
						.split('T')[0]!,
					end: end.toISOString().split('T')[0]!,
				},
				headers: {
					Authorization: `Basic ${btoa(key + ':')}`,
					// Authorization: `Basic d2FrYV9hZjZkN2ZiNS0xOWVlLTRlZDctODk4ZS01MTFhMDk4MjljYjk6`,
				},
				timeout: false,
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
