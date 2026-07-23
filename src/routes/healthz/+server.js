import { json } from '@sveltejs/kit'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const GET = async () => {
	return json({ ok: true })
}
