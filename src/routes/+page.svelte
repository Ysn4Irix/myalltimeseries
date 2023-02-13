<script>
	import Card from '$lib/components/Card.svelte'
	import { fly } from 'svelte/transition'

	/** @type {import('./$types').PageData} */
	export let data

	let first = 10

	$: ({ series } = data)
</script>

<svelte:head>
	<title>MyAllTimeSeries</title>
</svelte:head>

<main class="py-2">
	<ul
		class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
	>
		{#each series.slice(0, first) as { name, poster, id }}
			<li
				data-sveltekit-noscroll
				in:fly={{ y: 50, duration: 500, delay: 500 }}
				out:fly={{ duration: 500 }}
				{id}
			>
				<Card {name} {poster} />
			</li>
		{/each}
	</ul>
	{#if first < series.length}
		<div class="flex flex-row justify-center">
			<button on:click={() => (first = first + 5)} class="btn btn-secondary btn-wide" type="button">
				Load more
			</button>
		</div>
	{/if}
</main>
