import { describe, expect, it, vi } from 'vitest'
import { ObjectId } from 'mongodb'

const mocks = vi.hoisted(() => ({
	get_series: vi.fn()
}))

vi.mock('$db/series', () => ({
	get_series: mocks.get_series
}))

import { create_series, list_series, PaginationValidationError } from './series'

/**
 * @param {Array<Record<string, unknown>>} [data]
 */
function mock_collection(data = []) {
	const collection = {
		insertOne: vi.fn(),
		find: vi.fn(),
		sort: vi.fn(),
		limit: vi.fn(),
		toArray: vi.fn()
	}

	collection.find.mockReturnValue(collection)
	collection.sort.mockReturnValue(collection)
	collection.limit.mockReturnValue(collection)
	collection.toArray.mockResolvedValue(data)
	mocks.get_series.mockReturnValue(collection)

	return collection
}

describe('create_series', () => {
	it('trims name and poster, inserts only sanitized fields, and returns inserted id', async () => {
		const inserted_id = new ObjectId()
		const collection = mock_collection()
		collection.insertOne.mockResolvedValue({ insertedId: inserted_id })
		const input = {
			name: '  Dark  ',
			poster: '  https://example.com/dark.jpg  ',
			extra: 'ignored'
		}

		const id = await create_series(input)

		expect(collection.insertOne).toHaveBeenCalledWith({
			name: 'Dark',
			poster: 'https://example.com/dark.jpg'
		})
		expect(id).toBe(String(inserted_id))
	})
})

describe('list_series', () => {
	it('uses the default limit, newest-first sort, and limit plus one', async () => {
		const collection = mock_collection([])

		await list_series()

		expect(collection.find).toHaveBeenCalledWith({})
		expect(collection.sort).toHaveBeenCalledWith({ _id: -1 })
		expect(collection.limit).toHaveBeenCalledWith(11)
	})

	it('uses an explicit limit and fetches limit plus one', async () => {
		const collection = mock_collection([])

		await list_series({ limit: '2' })

		expect(collection.limit).toHaveBeenCalledWith(3)
	})

	it('caps large limits at 50', async () => {
		const collection = mock_collection([])

		await list_series({ limit: '100' })

		expect(collection.limit).toHaveBeenCalledWith(51)
	})

	it('rejects invalid limits', async () => {
		await expect(list_series({ limit: '0' })).rejects.toBeInstanceOf(PaginationValidationError)
		await expect(list_series({ limit: '-1' })).rejects.toBeInstanceOf(PaginationValidationError)
		await expect(list_series({ limit: '1.5' })).rejects.toBeInstanceOf(PaginationValidationError)
		await expect(list_series({ limit: 'abc' })).rejects.toBeInstanceOf(PaginationValidationError)
		await expect(list_series({ limit: 1.5 })).rejects.toBeInstanceOf(PaginationValidationError)
	})

	it('uses a valid cursor as an ObjectId upper bound', async () => {
		const cursor = new ObjectId().toHexString()
		const collection = mock_collection([])

		await list_series({ cursor })

		expect(collection.find).toHaveBeenCalledWith({
			_id: { $lt: new ObjectId(cursor) }
		})
	})

	it('rejects invalid cursors', async () => {
		await expect(list_series({ cursor: 'not-an-object-id' })).rejects.toBeInstanceOf(
			PaginationValidationError
		)
		await expect(list_series({ cursor: 123 })).rejects.toBeInstanceOf(PaginationValidationError)
	})

	it('serializes page data without exposing _id and returns more-page metadata', async () => {
		const first_id = new ObjectId()
		const second_id = new ObjectId()
		const overflow_id = new ObjectId()
		mock_collection([
			{ _id: first_id, name: 'First', poster: 'https://example.com/first.jpg', hidden: true },
			{ _id: second_id, name: 'Second', poster: 'https://example.com/second.jpg' },
			{ _id: overflow_id, name: 'Overflow', poster: 'https://example.com/overflow.jpg' }
		])

		const page = await list_series({ limit: 2 })

		expect(page).toEqual({
			data: [
				{ id: String(first_id), name: 'First', poster: 'https://example.com/first.jpg' },
				{ id: String(second_id), name: 'Second', poster: 'https://example.com/second.jpg' }
			],
			next_cursor: String(second_id),
			has_more: true
		})
		expect(page.data[0]).not.toHaveProperty('_id')
		expect(page.data[0]).not.toHaveProperty('hidden')
	})

	it('returns no next cursor when there is no additional page', async () => {
		const id = new ObjectId()
		mock_collection([{ _id: id, name: 'Only', poster: 'https://example.com/only.jpg' }])

		const page = await list_series({ limit: 2 })

		expect(page).toEqual({
			data: [{ id: String(id), name: 'Only', poster: 'https://example.com/only.jpg' }],
			next_cursor: null,
			has_more: false
		})
	})
})
