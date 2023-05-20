import { json } from '@sveltejs/kit'
import { series } from '$db/series'

/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export const GET = async () => {
	try {
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

		return json({
			status: 200,
			error: false,
			data
		})
	} catch (error) {
		return json({
			status: 200,
			error: true,
			message: error.message
		})
	}
}
