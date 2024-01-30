import ky from 'ky'

export const fetchData = async (
	key: string,
	start: Date,
	end: Date,
) =>
	ky.get('/', {
		searchParams: {
			start: start.toString(),
			end: end.toString(),
		},
		headers: {
			Authorization: `Basic ${key}`,
		},
	})
