<!-- src/routes/jobs/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbList,
		BreadcrumbSeparator
	} from '$lib/components/ui/breadcrumb';

	import { Search, Plus, Filter, Calendar, Home } from 'lucide-svelte';
	import type { Job } from '$lib/types';
	import JobPreview from '$lib/components/JobPreview.svelte';

	const { data } = $props();
	const sampleJobs = data.props.sampleJobs;

	let jobs: Job[] = $state([]);
	let searchQuery = $state('');
	let statusFilter = $state('all');
	let selectedDate: string = $state(new Date().toISOString().split('T')[0]);

	function filterJobs() {
		let filtered = [...sampleJobs];

		if (searchQuery) {
			filtered = filtered.filter(
				(job) =>
					job.pickup.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
					job.dropoff.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
					job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
					job.driver?.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		if (statusFilter !== 'all') {
			filtered = filtered.filter((job) => job.status === statusFilter);
		}

		jobs = filtered;
	}

	onMount(() => {
		jobs = sampleJobs;
	});
</script>

<div class="container mx-auto space-y-6 p-6">
	<Breadcrumb>
		<BreadcrumbList>
			<BreadcrumbItem>
				<a href="/">
					<Button variant="ghost" class="p-2">
						<Home class="h-4 w-4" />
					</Button>
				</a>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>Jobs</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Job Management</h1>
			<p class="text-muted-foreground">Create and manage transport jobs</p>
		</div>
		<a href="/jobs/create">
			<Button>
				<Plus class="mr-2 h-4 w-4" />
				Create New Job
			</Button>
		</a>
	</div>

	<!-- Filters -->
	<Card>
		<CardContent class="p-4">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="flex items-center space-x-2">
					<Search class="h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search jobs..."
						bind:value={searchQuery}
						on:input={filterJobs}
					/>
				</div>
				<div class="flex items-center space-x-2">
					<Filter class="h-4 w-4 text-muted-foreground" />
					<select
						class="w-full rounded-md border border-input bg-background px-3 py-2"
						bind:value={statusFilter}
						onchange={filterJobs}
					>
						<option value="all">All Statuses</option>
						<option value="pending">Pending</option>
						<option value="assigned">Assigned</option>
						<option value="in-transit">In Transit</option>
						<option value="completed">Completed</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>
				<div class="flex items-center space-x-2">
					<Calendar class="h-4 w-4 text-muted-foreground" />
					<Input type="date" bind:value={selectedDate} on:change={filterJobs} />
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Jobs List -->
	<Card>
		<CardHeader>
			<CardTitle>Jobs</CardTitle>
			<CardDescription>
				{jobs.length} jobs found
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				{#each jobs as job}
					<JobPreview {job} />
				{/each}
			</div>
		</CardContent>
		<CardFooter class="flex justify-between">
			<Button variant="outline">Previous</Button>
			<Button variant="outline">Next</Button>
		</CardFooter>
	</Card>
</div>
