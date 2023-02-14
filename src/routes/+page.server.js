import { series } from '$db/series'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({}) => {
	const data = await series
		.find(
			{},
			{
				projection: {
					_id: 0
				}
			}
		)
		.sort({ _id: -1 })
		.toArray()

	return {
		series: data
	}
}
