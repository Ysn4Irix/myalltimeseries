<script>
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

<section class="pt-32">
	<div class="flex flex-col h-screen place-items-center">
		<div class="text-5xl font-bold pb-4">
			{`${$page.status === 404 ? '404' : '500'}`}
		</div>
		<div class="pb-4 font-semibold text-3xl">
			{`${$page.status === 404 ? 'Page not found' : 'Unexpected Error'}`}
		</div>
		<div>
			{`${
				$page.status === 404
					? 'Sorry, we couldn’t find the page you’re looking for'
					: 'Oops! We have an problem in our server, try again later 😢'
			}`}
		</div>
	</div>
</section>
