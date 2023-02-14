import { series } from '$db/series'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({}) => {
	const count = await series.countDocuments()
	return {
		count
	}
}
