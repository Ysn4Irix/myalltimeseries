import { get_db } from '$db/mongo'

export function get_series() {
	return get_db().collection('series')
}
