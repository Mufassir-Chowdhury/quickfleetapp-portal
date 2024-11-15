<script lang="ts">
	import type { Job } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { getJobStatusColor } from '$lib/statusColors.js';
	import { AlertCircle, Car, Clock, MapPin } from 'lucide-svelte';
	import DriverAssignmentModal from '$lib/components/modals/DriverAssignmentModal.svelte';
	import DriverInfoModal from './modals/DriverInfoModal.svelte';

	let { job } = $props<{ job: Job }>();
	let showDriverModal = $state(false);

	function formatDateTime(dateString: string): string {
		return new Date(dateString).toLocaleString('en-GB', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

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

<!-- <div class="flex items-center justify-between rounded-lg border p-4">
    <div class="flex-1 space-y-1 border-r-2 pr-4">
        <div class="flex items-center justify-between">
            <span class="font-medium">Job #{job.id}</span>
            <Badge variant="outline" class={getDriverStatusColor(job.status)}>
                {job.status}
            </Badge>
        </div>
        <div class="flex items-center text-sm text-muted-foreground">
            <MapPin class="mr-1 h-4 w-4" />
            {job.pickup.address} → {job.dropoff.address}
        </div>
        <div class="flex items-center justify-between text-sm">
            <span class="flex items-center">
                <Car class="mr-1 h-4 w-4" />
                <DriverInfoModal name={job.driver.name} id={job.driver.id} />
            </span>
            <span class="flex items-center">
                <Clock class="mr-1 h-4 w-4" />
                ETA: {job.estimatedDuration}
            </span>
        </div>
    </div>
    <div class="ml-4">
        <a href="/jobs/{job.id}">
            <Button variant="outline" size="sm">View Details</Button>
        </a>
    </div>
</div> -->

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
				{formatDateTime(job.date)}
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
				<div class="flex items-center text-sm">
					<Car class="mr-1 h-4 w-4" />
					<span class="font-medium">Driver:</span>
					{#if job.driver}
						<span class="ml-1 text-muted-foreground"
							><DriverInfoModal name={job.driver.name} id={job.driver.id} /> ({job.driver
								.vehicle})</span
						>
					{:else}
						<span class="ml-1 text-red-500">Not assigned</span>
					{/if}
				</div>
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

	<div class="ml-0 mt-4 flex flex-col items-center justify-around gap-4 space-x-2 md:ml-4 md:mt-0">
		<a href="/jobs/${job.id}">
			<Button variant="outline" size="sm">View Details</Button>
		</a>
		{#if job.status === 'pending'}
			<Button on:click={handleAssignDriver} class="relative">
				<Badge
					class="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0"
				>
					2
				</Badge>
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
