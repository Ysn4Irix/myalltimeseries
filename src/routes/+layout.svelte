<script>
	import '$src/tailwind.css'

	let darkTheme = false

	/** @type {import('./$types').PageData} */
	export let data

	$: ({ count } = data)
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link href="https://fonts.googleapis.com/css2?family=Fresca&display=swap" rel="stylesheet" />
</svelte:head>

<div
	class="bg-base-200 min-h-screen transition-all duration-300 ease-in-out"
	data-theme={darkTheme ? 'night' : 'light'}
>
	<div class="flex flex-row justify-between items-center py-2">
		<a class="pb-2 m-3 mt-4" href="https://github.com/Ysn4Irix/myalltimeseries">
			<span>
				<svg class="w-8 h-8" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
					<path
						stroke-width="0"
						fill={darkTheme ? '#fff' : '#000'}
						d="M32,0,C14,0,0,14,0,32,0,53,19,62,22,62,24,62,24,61,24,60,L24,55,C17,57,14,53,13,50,13,50,13,49,11,47,10,46,6,44,10,44,13,44,15,48,15,48,18,52,22,51,24,50,24,48,26,46,26,46,18,45,12,42,12,31,12,27,13,24,15,22,15,22,13,18,15,13,15,13,20,13,24,17,27,15,37,15,40,17,44,13,49,13,49,13,51,20,49,22,49,22,51,24,52,27,52,31,52,42,45,45,38,46,39,47,40,49,40,52,L40,60,C40,61,40,62,42,62,45,62,64,53,64,32,64,14,50,0,32,0,Z"
					/>
				</svg>
			</span>
		</a>
		<div class="indicator">
			<span class="indicator-item badge badge-secondary font-bold">{count}</span>
			<a href="/" class="sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold pr-5">
				My All Time Series
			</a>
		</div>

		<label class="swap swap-rotate p-2 m-3 justify-center items-center ">
			<!-- this hidden checkbox controls the state -->
			<input on:click={() => (darkTheme = !darkTheme)} type="checkbox" />

			<!-- sun icon -->
			<svg
				class="swap-off fill-current w-9 h-9"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
				/>
			</svg>

			<!-- moon icon -->
			<svg
				class="swap-on fill-current w-9 h-9"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
				/>
			</svg>
		</label>
	</div>
	<slot />
</div>
