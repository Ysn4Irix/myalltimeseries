import { json } from '@sveltejs/kit'
import { get_admin_api_token } from '$lib/server/env'
import { create_series } from '$lib/server/series'

const MAX_NAME_LENGTH = 200
const MAX_POSTER_LENGTH = 2048

/**
 * @param {unknown} value
 */
function is_object(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * @param {string} poster
 */
function is_http_url(poster) {
	try {
		const url = new URL(poster)

		return url.protocol === 'http:' || url.protocol === 'https:'
	} catch {
		return false
	}
}

/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export const POST = async ({ request }) => {
	let admin_token

	try {
		admin_token = get_admin_api_token()
	} catch (error) {
		console.error(error)

		return json({ error: true, message: 'Internal server error' }, { status: 500 })
	}

	if (request.headers.get('authorization') !== `Bearer ${admin_token}`) {
		return json({ error: true, message: 'Unauthorized' }, { status: 401 })
	}

	let body

	try {
		body = await request.json()
	} catch {
		return json({ error: true, message: 'Invalid JSON body' }, { status: 400 })
	}

	if (!is_object(body)) {
		return json({ error: true, message: 'Invalid JSON body' }, { status: 400 })
	}

	const { name: raw_name, poster: raw_poster } = body

	if (typeof raw_name !== 'string' || typeof raw_poster !== 'string') {
		return json({ error: true, message: 'Invalid name or poster' }, { status: 400 })
	}

	const name = raw_name.trim()
	const poster = raw_poster.trim()

	if (
		!name ||
		!poster ||
		name.length > MAX_NAME_LENGTH ||
		poster.length > MAX_POSTER_LENGTH ||
		!is_http_url(poster)
	) {
		return json({ error: true, message: 'Invalid name or poster' }, { status: 400 })
	}

	try {
		const id = await create_series({
			name,
			poster
		})

		return json({ error: false, id }, { status: 201 })
	} catch (error) {
		console.error(error)

		return json({ error: true, message: 'Internal server error' }, { status: 500 })
	}
}
