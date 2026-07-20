import { ObjectId } from 'mongodb'
import { get_series } from '$db/series'

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

export class PaginationValidationError extends Error {
	constructor() {
		super('Invalid pagination parameters')
		this.name = 'PaginationValidationError'
	}
}

/**
 * @param {import('mongodb').WithId<import('mongodb').Document>} series
 */
export function serialize_series(series) {
	return {
		id: String(series._id),
		name: series.name,
		poster: series.poster
	}
}

/**
 * @param {unknown} limit
 */
function parse_limit(limit) {
	if (limit === undefined || limit === null) {
		return DEFAULT_LIMIT
	}

	if (typeof limit === 'number') {
		if (!Number.isInteger(limit) || limit < 1) {
			throw new PaginationValidationError()
		}

		return Math.min(limit, MAX_LIMIT)
	}

	if (typeof limit === 'string') {
		if (!/^[1-9]\d*$/.test(limit)) {
			throw new PaginationValidationError()
		}

		if (limit.length > String(MAX_LIMIT).length) {
			return MAX_LIMIT
		}

		const parsed_limit = Number(limit)

		if (!Number.isFinite(parsed_limit)) {
			throw new PaginationValidationError()
		}

		return Math.min(parsed_limit, MAX_LIMIT)
	}

	throw new PaginationValidationError()
}

/**
 * @param {unknown} cursor
 */
function parse_cursor(cursor) {
	if (cursor === undefined || cursor === null) {
		return null
	}

	if (typeof cursor !== 'string' || !/^[0-9a-fA-F]{24}$/.test(cursor)) {
		throw new PaginationValidationError()
	}

	return new ObjectId(cursor)
}

/**
 * @param {{ limit?: unknown, cursor?: unknown }} [options]
 */
export async function list_series(options = {}) {
	const { limit, cursor } = options
	const parsed_limit = parse_limit(limit)
	const parsed_cursor = parse_cursor(cursor)
	const query = parsed_cursor ? { _id: { $lt: parsed_cursor } } : {}
	const data = await get_series()
		.find(query)
		.sort({ _id: -1 })
		.limit(parsed_limit + 1)
		.toArray()
	const page_data = data.slice(0, parsed_limit).map(serialize_series)
	const has_more = data.length > parsed_limit

	return {
		data: page_data,
		next_cursor: has_more && page_data.length > 0 ? page_data[page_data.length - 1].id : null,
		has_more
	}
}

/**
 * @param {{ name: string, poster: string }} series
 */
export async function create_series({ name, poster }) {
	const response = await get_series().insertOne({
		name: name.trim(),
		poster: poster.trim()
	})

	return String(response.insertedId)
}
