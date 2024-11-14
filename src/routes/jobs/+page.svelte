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
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbList,
		BreadcrumbSeparator
	} from '$lib/components/ui/breadcrumb';

	import {
		MapPin,
		Car,
		Clock,
		Search,
		Plus,
		Filter,
		Calendar,
		AlertCircle,
		Home
	} from 'lucide-svelte';
	import DriverAssignmentModal from '$lib/components/modals/DriverAssignmentModal.svelte';
	import { getJobStatusColor } from '$lib/statusColors.js';
	import type { Job } from '$lib/types';

	const { data } = $props();
	const sampleJobs = data.props.sampleJobs;

	let jobs: Job[] = $state([]);
	let searchQuery = $state('');
	let statusFilter = $state('all');
	let selectedDate: string = $state(new Date().toISOString().split('T')[0]);
	let showDriverModal = $state(false);

	function formatDateTime(dateString: string): string {
		return new Date(dateString).toLocaleString('en-GB', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

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
	function handleAssignDriver() {
		showDriverModal = true;
	}

	function handleDriverAssigned(event: CustomEvent<{ driverId: string }>) {
		// Handle driver assignment
		console.log('Driver assigned:', event.detail.driverId);
		showDriverModal = false;
		// In real app, update job status and refresh data
	}
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
					<div
						class="flex flex-col items-start justify-between rounded-lg border p-4 md:flex-row md:items-center"
					>
						<div class="flex-1 space-y-2">
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-2">
									<span class="font-medium">Job #{job.id}</span>
									<Badge variant="outline" class={getJobStatusColor(job.status)}>
										{job.status}
									</Badge>
								</div>
								<span class="text-sm text-muted-foreground">
									{formatDateTime(job.createdAt)}
								</span>
							</div>

							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div class="space-y-1">
									<div class="flex items-center text-sm">
										<MapPin class="mr-1 h-4 w-4" />
										<span class="font-medium">Pickup:</span>
										<span class="ml-1 text-muted-foreground">{job.pickup.address}</span>
									</div>
									<div class="flex items-center text-sm">
										<MapPin class="mr-1 h-4 w-4" />
										<span class="font-medium">Dropoff:</span>
										<span class="ml-1 text-muted-foreground">{job.dropoff.address}</span>
									</div>
								</div>

								<div class="space-y-1">
									{#if job.driver}
										<div class="flex items-center text-sm">
											<Car class="mr-1 h-4 w-4" />
											<span class="font-medium">Driver:</span>
											<span class="ml-1 text-muted-foreground"
												>{job.driver.name} ({job.driver.vehicle})</span
											>
										</div>
									{/if}
									<div class="flex items-center text-sm">
										<Clock class="mr-1 h-4 w-4" />
										<span class="font-medium">ETA:</span>
										<span class="ml-1 text-muted-foreground">{job.estimatedDuration}</span>
									</div>
								</div>
							</div>

							{#if job.notes}
								<div class="mt-2 flex items-start text-sm">
									<AlertCircle class="mr-1 mt-0.5 h-4 w-4" />
									<span class="text-muted-foreground">{job.notes}</span>
								</div>
							{/if}
						</div>

						<div class="ml-0 mt-4 flex items-center space-x-2 md:ml-4 md:mt-0">
							<a href="/jobs/${job.id}">
								<Button variant="outline" size="sm">View Details</Button>
							</a>
							{#if job.status === 'pending'}
								<Button on:click={handleAssignDriver}>
									<Car class="mr-2 h-4 w-4" />
									Assign Driver
								</Button>
							{/if}
						</div>
					</div>
					{#if showDriverModal}
						<DriverAssignmentModal
							jobId={job.id}
							on:close={() => (showDriverModal = false)}
							on:driverAssigned={handleDriverAssigned}
						/>
					{/if}
				{/each}
			</div>
		</CardContent>
		<CardFooter class="flex justify-between">
			<Button variant="outline">Previous</Button>
			<Button variant="outline">Next</Button>
		</CardFooter>
	</Card>
</div>
