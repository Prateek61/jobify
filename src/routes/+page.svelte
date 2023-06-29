<script>
	export let data;
	import Job from './job.svelte';
</script>

<div class="jobs">
	{#each data.data as job}
		<Job {...job} />
	{/each}
</div>


<style lang="postcss">
	.jobs {
		@apply max-w-5xl mx-auto mt-4;
	}
</style>
