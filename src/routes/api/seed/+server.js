import { json } from '@sveltejs/kit'
import { series } from '$db/series'

/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

//? SEED COMPLETED
export const GET = async () => {
	try {
		/* const response = await series.insertMany([])

		return json({
			status: 200,
			error: false,
			response
		}) */

		return json({
			status: 200,
			error: false,
			response: 'Nothing here'
		})
	} catch (error) {
		return json({
			status: 200,
			error: true,
			message: error instanceof Error ? error.message : 'Unknown error'
		})
	}
}
