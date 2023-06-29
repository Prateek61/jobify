<script>
	import { onMount } from 'svelte';

	export let position;
	export let timing;
	export let location;
	export let keywords;
	export let company;
	export let company_logo;
	export let posted_on;

	// parse the date string
	const date = new Date(posted_on);
	// get the current date
	const now = new Date();
	// get the difference in milliseconds
	const diff = now - date;
	// get the difference in days
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
</script>

<div class="card flex items-center justify-between p-4 my-4 variant-glass-primary">
	<div class="flex space-x-10">
		<div class="h-14 w-14 rounded-full flex items-center">
			<img src={company_logo} class="rounded-full" alt={company_logo} />
		</div>

		<div class="">
			<div class="font-bold text-sm text-[#33df21]">
				{company}
			</div>
			<div class="font-bold text-xl">
				{position}
			</div>
			<div class="flex space-x-2 text-[.8rem]">
				<div>
					{days}d ago
				</div>
				<div>-</div>
				<div>
					{timing}
				</div>
				<div>-</div>
				<div>
					{location}
				</div>
			</div>
		</div>
	</div>
	<div class="flex space-x-3">
		{#each keywords as keyword}
			<div class="bg-[#d0fff8]/[.5] variant-glass-secondary p-1 rounded-md">
				{keyword}
			</div>
		{/each}
	</div>
</div>

<style>
</style>
