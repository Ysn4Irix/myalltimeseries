<script>
	/** @type {string} */
	export let name
	/** @type {string} */
	export let poster
</script>

<div
	class="rounded-lg overflow-hidden shadow-xl motion-safe:hover:scale-105 motion-safe:transition motion-safe:duration-300"
>
	<img
		class="w-full aspect-[2/3] object-contain bg-base-300"
		src={poster}
		alt={`${name} poster`}
		loading="lazy"
		decoding="async"
	/>
	<div class="py-5 px-6">
		<div class="font-bold text-xl text-center">{name}</div>
	</div>
</div>
