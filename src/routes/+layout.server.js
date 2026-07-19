import { get_series } from '$db/series'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({}) => {
	const count = await get_series().countDocuments()
	return {
		count
	}
}
