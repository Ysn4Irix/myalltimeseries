import { json } from '@sveltejs/kit'
import { list_series } from '$lib/server/series'

/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export const GET = async () => {
	try {
		const data = await list_series()

		return json({
			error: false,
			data
		})
	} catch (error) {
		console.error(error)

		return json({ error: true, message: 'Internal server error' }, { status: 500 })
	}
}
