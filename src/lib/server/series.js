import { get_series } from '$db/series'

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

export async function list_series() {
	const data = await get_series().find({}).sort({ _id: -1 }).toArray()

	return data.map(serialize_series)
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
