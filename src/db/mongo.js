import { MongoClient } from 'mongodb'
import { get_mongo_url } from '$lib/server/env'

/** @type {MongoClient | undefined} */
let client

function get_client() {
	client ??= new MongoClient(get_mongo_url())
	return client
}

export function get_db() {
	return get_client().db()
}
