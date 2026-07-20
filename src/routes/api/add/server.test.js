import { describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
	get_admin_api_token: vi.fn(),
	create_series: vi.fn()
}))

vi.mock('$lib/server/env', () => ({
	get_admin_api_token: mocks.get_admin_api_token
}))

vi.mock('$lib/server/series', () => ({
	create_series: mocks.create_series
}))

import { POST } from './+server'

const token = 'test-admin-token'

/**
 * @param {unknown} body
 * @param {string | null | undefined} [authorization]
 */
function request(body, authorization = `Bearer ${token}`) {
	const headers = new Headers({ 'content-type': 'application/json' })

	if (authorization) {
		headers.set('authorization', authorization)
	}

	return new Request('http://localhost/api/add', {
		method: 'POST',
		headers,
		body: typeof body === 'string' ? body : JSON.stringify(body)
	})
}

/**
 * @param {unknown} body
 * @param {string | null | undefined} [authorization]
 */
async function post(body, authorization) {
	return POST(/** @type {any} */ ({ request: request(body, authorization) }))
}

describe('POST /api/add', () => {
	it('returns 401 for missing auth and does not create', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		const response = await post({ name: 'Dark', poster: 'https://example.com/dark.jpg' }, null)

		expect(response.status).toBe(401)
		expect(await response.json()).toEqual({ error: true, message: 'Unauthorized' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns 401 for invalid auth and does not create', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		const response = await post(
			{ name: 'Dark', poster: 'https://example.com/dark.jpg' },
			'Bearer wrong-token'
		)

		expect(response.status).toBe(401)
		expect(await response.json()).toEqual({ error: true, message: 'Unauthorized' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns a generic 500 when auth configuration fails', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		mocks.get_admin_api_token.mockImplementation(() => {
			throw new Error('missing token')
		})

		const response = await post({ name: 'Dark', poster: 'https://example.com/dark.jpg' })

		expect(response.status).toBe(500)
		expect(await response.json()).toEqual({ error: true, message: 'Internal server error' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns 400 for invalid JSON', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		const response = await post('{')

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: true, message: 'Invalid JSON body' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns 400 for a non-object body', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		const response = await post(['Dark'])

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: true, message: 'Invalid JSON body' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns 400 for missing or non-string fields', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		for (const body of [
			{},
			{ name: 'Dark' },
			{ poster: 'https://example.com/dark.jpg' },
			{ name: 123, poster: 'https://example.com/dark.jpg' },
			{ name: 'Dark', poster: 123 }
		]) {
			const response = await post(body)

			expect(response.status).toBe(400)
			expect(await response.json()).toEqual({ error: true, message: 'Invalid name or poster' })
		}

		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns 400 for blank fields', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		const response = await post({ name: '   ', poster: 'https://example.com/dark.jpg' })

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: true, message: 'Invalid name or poster' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns 400 for overlong values', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		const response = await post({
			name: 'a'.repeat(201),
			poster: 'https://example.com/dark.jpg'
		})

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: true, message: 'Invalid name or poster' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('returns 400 for an invalid poster URL', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)

		const response = await post({ name: 'Dark', poster: 'javascript:alert(1)' })

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({ error: true, message: 'Invalid name or poster' })
		expect(mocks.create_series).not.toHaveBeenCalled()
	})

	it('creates a valid series and returns 201 with its id', async () => {
		mocks.get_admin_api_token.mockReturnValue(token)
		mocks.create_series.mockResolvedValue('series-id')

		const response = await post({
			name: '  Dark  ',
			poster: '  https://example.com/dark.jpg  '
		})

		expect(response.status).toBe(201)
		expect(await response.json()).toEqual({ error: false, id: 'series-id' })
		expect(mocks.create_series).toHaveBeenCalledWith({
			name: 'Dark',
			poster: 'https://example.com/dark.jpg'
		})
	})

	it('returns a generic 500 when the create helper fails', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		mocks.get_admin_api_token.mockReturnValue(token)
		mocks.create_series.mockRejectedValue(new Error('database unavailable'))

		const response = await post({ name: 'Dark', poster: 'https://example.com/dark.jpg' })

		expect(response.status).toBe(500)
		expect(await response.json()).toEqual({ error: true, message: 'Internal server error' })
	})
})
