import { env } from '$env/dynamic/private'

/**
 * @param {'MONGO_URL' | 'ADMIN_API_TOKEN'} name
 */
function require_env(name) {
	const value = env[name]

	if (!value || !value.trim()) {
		throw new Error(`Missing required runtime environment variable: ${name}`)
	}

	return value
}

export function get_mongo_url() {
	try {
		return require_env('MONGO_URL')
	} catch (error) {
		console.error(error)
		throw new Error('Database configuration is unavailable')
	}
}

export function get_admin_api_token() {
	return require_env('ADMIN_API_TOKEN')
}
