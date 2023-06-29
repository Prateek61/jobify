<script>
	export let data;
	import Job from './job.svelte';

	let all_timings_set = new Set();
	let all_locations_set = new Set();
	let all_keywords_set = new Set();

	data.jobs.forEach(job => {
		all_timings_set.add(job.timing);
		all_locations_set.add(job.location);
		job.keywords.forEach(keyword => {
			all_keywords_set.add(keyword);
		});
	});

	// filter jobs by timing
	let all_timings = Array.from(all_timings_set);
	let selected_timings = all_timings;
	let timing_filters = {}
	// loop over all_timings and set the initial value of each timing to false
	all_timings.forEach(timing => {
		timing_filters[timing] = false;
	});
	function filter_by_timing() {
		selected_timings = all_timings.filter(timing => {
			return timing_filters[timing];
		});
		filter_jobs();
	}

	// filter jobs by location
	let all_locations = Array.from(all_locations_set);
	let selected_locations = all_locations;
	let location_filters = {}
	all_locations.forEach(location => {
		location_filters[location] = false;
	});
	function filter_by_location() {
		selected_locations = all_locations.filter(location => {
			return location_filters[location];
		});
		filter_jobs();
	}

	// filter jobs by keyword
	let all_keywords = Array.from(all_keywords_set);
	let selected_keywords = all_keywords;
	let keyword_filters = {}
	all_keywords.forEach(keyword => {
		keyword_filters[keyword] = false;
	});
	function filter_by_keyword() {
		selected_keywords = all_keywords.filter(keyword => {
			return keyword_filters[keyword];
		});
		filter_jobs();
	}

	let filtered_jobs = data.jobs
	function filter_jobs() {
	filtered_jobs = data.jobs.filter(job => {
		const is_timings_false = Object.values(timing_filters).every(filter => !filter);
		const is_locations_false = Object.values(location_filters).every(filter => !filter);
		const is_keywords_false = Object.values(keyword_filters).every(filter => !filter);

		if (is_timings_false) {
			selected_timings = all_timings;
		}
		if (is_locations_false) {
			selected_locations = all_locations;
		}
		if (is_keywords_false) {
			selected_keywords = all_keywords;
		}

		if (is_timings_false &&
			is_keywords_false &&
			is_locations_false) {
			return true;
		}

		// Filter jobs by timing, location, and keyword
		return (
			(!selected_timings.length || selected_timings.includes(job.timing)) &&
			(!selected_locations.length || selected_locations.includes(job.location)) &&
			selected_keywords.some(keyword => job.keywords.includes(keyword))
		);
	});
}

</script>

<!-- filter jobs by timing -->
<div class="flex space-x-2">
	{#each all_timings as timing}
		<div class="flex items-center space-x-1">
			<input type="checkbox" bind:checked={timing_filters[timing]} value={timing} on:change={filter_by_timing} />
			<div>{timing}</div>
		</div>
	{/each}
</div>

<!-- filter jobs by location -->
<div class="flex space-x-2">
	{#each all_locations as location}
		<div class="flex items-center space-x-1">
			<input type="checkbox" bind:checked={location_filters[location]} value={location} on:change={filter_by_location} />
			<div>{location}</div>
		</div>
	{/each}
</div>

<!-- filter jobs by keyword -->
<div class="flex space-x-2">
	{#each all_keywords as keyword}
		<div class="flex items-center space-x-1">
			<input type="checkbox" bind:checked={keyword_filters[keyword]} value={keyword} on:change={filter_by_keyword} />
			<div>{keyword}</div>
		</div>
	{/each}
</div>

<div class="max-w-5xl mx-auto mt-4">
	{#each filtered_jobs as job}
		<Job {...job} />
	{/each}
</div>
