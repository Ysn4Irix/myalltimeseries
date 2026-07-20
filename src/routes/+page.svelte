<script>
	import { onMount } from 'svelte'
	import Card from '$lib/components/Card.svelte'
	import { fly } from 'svelte/transition'
	const PAGE_SIZE = 10
	/**
	 * @typedef {{ id: string, name: string, poster: string }} Series
	 * @typedef {{ error?: boolean, data: Series[], next_cursor: string | null, has_more: boolean }} SeriesPage
	 */

	/** @type {import('./$types').PageData} */
	export let data

	/** @type {Series[]} */
	let series = data.series
	/** @type {string | null} */
	let next_cursor = data.next_cursor
	let has_more = data.has_more
	let loading = false
	let error = ''
	/** @type {HTMLElement | undefined} */
	let sentinel
	/** @type {IntersectionObserver | undefined} */
	let observer
	/** @type {AbortController | undefined} */
	let abort_controller

	/**
	 * @param {unknown} value
	 */
	function is_abort_error(value) {
		return value instanceof DOMException && value.name === 'AbortError'
	}

	async function load_more() {
		if (!has_more || loading || error || !next_cursor) {
			return
		}

		loading = true
		abort_controller = new AbortController()

		try {
			const response = await fetch(
				`/api/all?limit=${PAGE_SIZE}&cursor=${encodeURIComponent(next_cursor)}`,
				{ signal: abort_controller.signal }
			)

			if (!response.ok) {
				throw new Error('Unable to load more series')
			}

			/** @type {SeriesPage} */
			const page = await response.json()

			if (page.error) {
				throw new Error('Unable to load more series')
			}

			const existing_ids = new Set(series.map(({ id }) => id))
			const next_series = page.data.filter(({ id }) => !existing_ids.has(id))

			series = [...series, ...next_series]
			next_cursor = page.next_cursor
			has_more = page.has_more

			if (!has_more && observer) {
				observer.disconnect()
			}
		} catch (load_error) {
			if (is_abort_error(load_error)) {
				return
			}

			error = 'Could not load more series.'
			has_more = false

			if (observer) {
				observer.disconnect()
			}
		} finally {
			loading = false
			abort_controller = undefined
		}
	}

	onMount(() => {
		if (!sentinel || !has_more) {
			return
		}

		observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					load_more()
				}
			},
			{ rootMargin: '200px 0px' }
		)

		observer.observe(sentinel)

		return () => {
			if (observer) {
				observer.disconnect()
			}

			if (abort_controller) {
				abort_controller.abort()
			}
		}
	})
</script>

<svelte:head>
	<title>MyAllTimeSeries</title>
</svelte:head>

<main class="py-2">
	<ul
		class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
	>
		{#each series as { name, poster, id } (id)}
			<li in:fly={{ y: 50, duration: 500, delay: 500 }} out:fly={{ duration: 500 }} {id}>
				<Card {name} {poster} />
			</li>
		{/each}
	</ul>

	<div bind:this={sentinel} class="h-1" aria-hidden="true" />

	{#if loading}
		<p class="pb-10 text-center text-sm opacity-70" role="status" aria-live="polite">
			Loading more series...
		</p>
	{:else if error}
		<p class="pb-10 text-center text-sm text-error" role="alert">{error}</p>
	{:else if !has_more}
		<p class="pb-10 text-center text-sm opacity-70" role="status" aria-live="polite">
			All series loaded.
		</p>
	{/if}
</main>
