import { json } from '@sveltejs/kit'
import { get_series } from '$db/series'

/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export const GET = async () => {
	try {
		const data = await get_series()
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
			error: false,
			data
		})
	} catch (error) {
		console.error(error)

		return json({ error: true, message: 'Internal server error' }, { status: 500 })
	}
}
