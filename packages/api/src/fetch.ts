import ky from 'ky'

const endpoint = 'https://wakatime.com/api/v1/'

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
	langs: Array<{
		name: string
		total_seconds: number
		percent: number
	}>
}

// same as d.toISOString().split('T')[0]!
const formatDate = (d: Date) =>
	`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

export const fetchData = async (
	key: string,
	start: Date,
	end: Date,
): Promise<Array<DayStatistics>> =>
	(
		await ky
			.get(endpoint + 'users/current/summaries', {
				searchParams: {
					start: formatDate(start),
					end: formatDate(end),
				},
				headers: {
					Authorization: `Basic ${btoa(key + ':')}`,
				},
				timeout: false,
			})
			.json<RawData>()
	).data.map(({ languages, range: { date } }) => ({
		date,
		langs: languages,
	}))
