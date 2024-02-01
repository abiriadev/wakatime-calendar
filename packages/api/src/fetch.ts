import ky from 'ky'

export interface RawData {
	data: Array<{
		languages: Array<{
			name: string
			total_seconds: number
			percent: number
		}>
		range: {
			date: string
		}
	}>
}

export interface DayStatistics {
	date: string
	topLang: string | null
	langs: Array<{
		name: string
		total_seconds: number
		percent: number
	}>
}

export const fetchData = async (
	key: string,
	start: Date,
	end: Date,
): Promise<Array<DayStatistics>> =>
	(
		await ky
			.get(
				'https://wakatime.com/api/v1/users/current/summaries',
				{
					searchParams: {
						start: start
							.toISOString()
							.split('T')[0]!,
						end: end
							.toISOString()
							.split('T')[0]!,
					},
					headers: {
						Authorization: `Basic ${btoa(key + ':')}`,
					},
					timeout: false,
				},
			)
			.json<RawData>()
	).data.map(({ languages, range: { date } }) => ({
		date,
		topLang: languages[0]?.name ?? null,
		langs: languages,
	}))
