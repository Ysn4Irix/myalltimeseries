import { list_series } from '$lib/server/series'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({}) => {
	const page = await list_series({ limit: 10 })

	return {
		series: page.data,
		next_cursor: page.next_cursor,
		has_more: page.has_more
	}
}
