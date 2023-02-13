import { json } from '@sveltejs/kit'
import { series } from '$db/series'
/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export const GET = async ({ url }) => {
	const name = url.searchParams.get('name')
	const poster = url.searchParams.get('poster')

	if (!name && !poster)
		return json({
			status: 400,
			error: true,
			message: 'Name && Poster fields is required'
		})

	try {
		const response = await series.insertOne({
			name,
			poster
		})

		return json({
			status: 200,
			error: false,
			response
		})
	} catch (error) {
		return json({
			status: 200,
			error: true,
			message: error.message
		})
	}
}
