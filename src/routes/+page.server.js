import { list_series } from '$lib/server/series'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({}) => {
	return {
		series: await list_series()
	}
}
