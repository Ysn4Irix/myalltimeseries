<script>
	export let name
	export let poster
</script>

<div class=" max-w-xs rounded-lg overflow-hidden shadow-xl hover:scale-105 transition duration-300">
	<img class="w-full" src={poster} alt="Trainers" />
	<div class="py-5 px-6">
		<div class="font-bold text-xl text-center">{name}</div>
	</div>
</div>
