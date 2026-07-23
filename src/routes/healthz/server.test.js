import { describe, expect, it, vi } from 'vitest'

vi.mock('$lib/server/env', () => {
	throw new Error('healthz must not import env helpers')
})

vi.mock('$lib/server/series', () => {
	throw new Error('healthz must not import series helpers')
})

vi.mock('mongodb', () => {
	throw new Error('healthz must not import MongoDB')
})

import { GET } from './+server'

describe('GET /healthz', () => {
	it('returns ok without env or MongoDB dependencies', async () => {
		const response = await GET(/** @type {any} */ ({}))

		expect(response.status).toBe(200)
		expect(await response.json()).toEqual({ ok: true })
	})
})
