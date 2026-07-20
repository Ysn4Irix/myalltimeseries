import { json } from '@sveltejs/kit'
import { list_series, PaginationValidationError } from '$lib/server/series'

/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export const GET = async ({ url }) => {
	try {
		const page = await list_series({
			limit: url.searchParams.get('limit'),
			cursor: url.searchParams.get('cursor')
		})

		return json({
			error: false,
			data: page.data,
			next_cursor: page.next_cursor,
			has_more: page.has_more
		})
	} catch (error) {
		if (error instanceof PaginationValidationError) {
			return json({ error: true, message: 'Invalid pagination parameters' }, { status: 400 })
		}

		console.error(error)

		return json({ error: true, message: 'Internal server error' }, { status: 500 })
	}
}
