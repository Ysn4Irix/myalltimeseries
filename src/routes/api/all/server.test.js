import { describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => {
	class PaginationValidationError extends Error {
		constructor() {
			super('Invalid pagination parameters')
			this.name = 'PaginationValidationError'
		}
	}

	return {
		list_series: vi.fn(),
		PaginationValidationError
	}
})

vi.mock('$lib/server/series', () => ({
	list_series: mocks.list_series,
	PaginationValidationError: mocks.PaginationValidationError
}))

import { GET } from './+server'

/**
 * @param {string} url
 */
async function get(url) {
	return GET(/** @type {any} */ ({ url: new URL(url) }))
}

describe('GET /api/all', () => {
	it('passes query params to list_series and returns the success response shape', async () => {
		const data = [{ id: 'series-id', name: 'Dark', poster: 'https://example.com/dark.jpg' }]
		mocks.list_series.mockResolvedValue({ data, next_cursor: 'next-id', has_more: true })

		const response = await get('http://localhost/api/all?limit=5&cursor=cursor-id')

		expect(mocks.list_series).toHaveBeenCalledWith({ limit: '5', cursor: 'cursor-id' })
		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({
			error: false,
			data,
			next_cursor: 'next-id',
			has_more: true
		})
	})

	it('returns 400 for pagination validation errors', async () => {
		mocks.list_series.mockRejectedValue(new mocks.PaginationValidationError())

		const response = await get('http://localhost/api/all?limit=bad')

		expect(response.status).toBe(400)
		expect(await response.json()).toEqual({
			error: true,
			message: 'Invalid pagination parameters'
		})
	})

	it('returns a generic 500 for unexpected errors', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		mocks.list_series.mockRejectedValue(new Error('database unavailable'))

		const response = await get('http://localhost/api/all')

		expect(response.status).toBe(500)
		expect(await response.json()).toEqual({ error: true, message: 'Internal server error' })
	})
})
