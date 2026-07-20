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
	let reduce_motion = false
	/** @type {HTMLElement | undefined} */
	let sentinel
	/** @type {IntersectionObserver | undefined} */
	let observer
	/** @type {AbortController | undefined} */
	let abort_controller

	$: fly_in = reduce_motion ? { y: 0, duration: 0, delay: 0 } : { y: 50, duration: 500, delay: 500 }
	$: fly_out = reduce_motion ? { duration: 0 } : { duration: 500 }

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
		const reduced_motion_query = window.matchMedia('(prefers-reduced-motion: reduce)')
		const update_reduce_motion = () => {
			reduce_motion = reduced_motion_query.matches
		}

		update_reduce_motion()

		if (reduced_motion_query.addEventListener) {
			reduced_motion_query.addEventListener('change', update_reduce_motion)
		} else {
			reduced_motion_query.addListener(update_reduce_motion)
		}

		if (sentinel && has_more) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						load_more()
					}
				},
				{ rootMargin: '200px 0px' }
			)

			observer.observe(sentinel)
		}

		return () => {
			if (reduced_motion_query.removeEventListener) {
				reduced_motion_query.removeEventListener('change', update_reduce_motion)
			} else {
				reduced_motion_query.removeListener(update_reduce_motion)
			}

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
	<h1 class="px-10 pt-8 text-3xl font-bold sm:text-4xl">Series catalog</h1>

	<ul
		class="p-10 pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
	>
		{#each series as { name, poster, id } (id)}
			<li in:fly={fly_in} out:fly={fly_out} {id}>
				<Card {name} {poster} />
			</li>
		{/each}
	</ul>

	<div bind:this={sentinel} class="h-1" aria-hidden="true">
		<!-- infinite scroll sentinel -->
	</div>

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
