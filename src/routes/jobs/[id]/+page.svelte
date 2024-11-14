<!-- src/routes/jobs/[id]/+page.svelte -->
<script lang="ts">
	import { getJobStatusColor } from '$lib/statusColors.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
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
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger
	} from '$lib/components/ui/alert-dialog';
	import { format } from 'date-fns';
	import ChatDialog from '$lib/components/messaging/ChatDialog.svelte';
	import NotificationsPopover from '$lib/components/notifications/NotificationsPopover.svelte';

	import {
		MapPin,
		Car,
		Clock,
		User,
		Calendar,
		PoundSterling,
		MessageCircle,
		Users,
		ArrowLeft,
		Pencil,
		XCircle
	} from 'lucide-svelte';

	// Import the driver assignment modal component
	import DriverAssignmentModal from '$lib/components/modals/DriverAssignmentModal.svelte';
	import type { Job } from '$lib/types';

	let { data } = $props();
	let sampleJob = data.props.job;

	let job: Job | null = $state(null);
	let isLoading = $state(true);
	let error: string | null = $state(null);
	let showDriverModal = $state(false);
	let showChatDialog = $state(false);

	onMount(async () => {
		try {
			// In real app, fetch job data from PocketBase using $page.params.id
			job = sampleJob;
		} catch (e) {
			error = 'Failed to load job details';
			console.error(e);
		} finally {
			isLoading = false;
		}
	});

	function formatDateTime(dateStr: string, timeStr: string): string {
		const date = new Date(`${dateStr}T${timeStr}`);
		return format(date, 'PPp');
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

	async function handleCancelJob() {
		try {
			// In real app, make API call to cancel job
			console.log('Cancelling job:', job?.id);
			goto('/jobs');
		} catch (e) {
			console.error('Error cancelling job:', e);
		}
	}
</script>

<div class="container mx-auto max-w-3xl p-6">
	<!-- Back button -->
	<Button variant="ghost" class="mb-6" on:click={() => goto('/jobs')}>
		<ArrowLeft class="mr-2 h-4 w-4" />
		Back to Jobs
	</Button>

	{#if isLoading}
		<div class="flex h-64 items-center justify-center">
			<div class="loading loading-spinner loading-lg"></div>
		</div>
	{:else if error}
		<Card>
			<CardContent class="p-6">
				<div class="text-center text-destructive">
					{error}
				</div>
			</CardContent>
		</Card>
	{:else if job}
		<Card>
			<CardHeader>
				<div class="flex items-start justify-between">
					<div>
						<CardTitle class="text-2xl">Job #{job.id}</CardTitle>
						<CardDescription>Created {format(new Date(job.createdAt), 'PPp')}</CardDescription>
					</div>
					<div class="flex items-center space-x-2">
						<NotificationsPopover />
						{#if job.driver}
							<Button variant="outline" size="icon" onclick={() => (showChatDialog = true)}>
								<MessageCircle class="h-5 w-5" />
							</Button>
						{/if}
						<Badge variant="outline" class={getJobStatusColor(job.status)}>
							{job.status}
						</Badge>
					</div>
				</div>
			</CardHeader>

			<CardContent class="space-y-6">
				<!-- Customer Info -->
				<div class="space-y-2">
					<h3 class="text-lg font-semibold">Customer Details</h3>
					<div class="flex items-center space-x-2">
						<User class="h-4 w-4 text-muted-foreground" />
						<span>{job.customerName}</span>
					</div>
					<div class="flex items-center space-x-2">
						<Users class="h-4 w-4 text-muted-foreground" />
						<span>{job.passengers} passenger{job.passengers !== 1 ? 's' : ''}</span>
					</div>
				</div>

				<!-- Location Info -->
				<div class="space-y-2">
					<h3 class="text-lg font-semibold">Journey Details</h3>
					<div class="grid gap-2">
						<div class="flex items-start space-x-2">
							<MapPin class="mt-1 h-4 w-4 text-muted-foreground" />
							<div>
								<span class="font-medium">Pickup:</span>
								<p class="text-muted-foreground">{job.pickup.address}</p>
							</div>
						</div>
						<div class="flex items-start space-x-2">
							<MapPin class="mt-1 h-4 w-4 text-muted-foreground" />
							<div>
								<span class="font-medium">Drop-off:</span>
								<p class="text-muted-foreground">{job.dropoff.address}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Schedule Info -->
				<div class="space-y-2">
					<h3 class="text-lg font-semibold">Schedule</h3>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div class="flex items-center space-x-2">
							<Calendar class="h-4 w-4 text-muted-foreground" />
							{#if job.date && job.time}
								<span>Pickup: {formatDateTime(job.date, job.time)}</span>
							{/if}
						</div>
						<div class="flex items-center space-x-2">
							<Clock class="h-4 w-4 text-muted-foreground" />
							<span>Duration: {job.estimatedDuration}</span>
						</div>
					</div>
				</div>

				<!-- Vehicle Info -->
				<div class="space-y-2">
					<h3 class="text-lg font-semibold">Vehicle Details</h3>
					<div class="flex items-center space-x-2">
						<Car class="h-4 w-4 text-muted-foreground" />
						<span
							>Required: {job.vehicleType.charAt(0).toUpperCase() + job.vehicleType.slice(1)}</span
						>
					</div>
				</div>

				<!-- Fare Info -->
				<div class="space-y-2">
					<h3 class="text-lg font-semibold">Payment</h3>
					<div class="flex items-center space-x-2">
						<PoundSterling class="h-4 w-4 text-muted-foreground" />
						<span>Estimated fare: £{job.fare.toFixed(2)}</span>
					</div>
				</div>

				{#if job.driver}
					<!-- Driver Info -->
					<div class="space-y-2">
						<h3 class="text-lg font-semibold">Assigned Driver</h3>
						<div class="grid gap-2">
							<div class="flex items-center space-x-2">
								<User class="h-4 w-4 text-muted-foreground" />
								<span>{job.driver.name}</span>
							</div>
							<div class="flex items-center space-x-2">
								<Car class="h-4 w-4 text-muted-foreground" />
								<span>{job.driver.vehicle}</span>
							</div>
							<div class="flex items-center space-x-2">
								<MessageCircle class="h-4 w-4 text-muted-foreground" />
								<span>{job.driver.phoneNumber}</span>
							</div>
						</div>
					</div>
				{/if}

				{#if job.notes}
					<!-- Notes -->
					<div class="space-y-2">
						<h3 class="text-lg font-semibold">Additional Notes</h3>
						<p class="text-muted-foreground">{job.notes}</p>
					</div>
				{/if}
			</CardContent>

			<CardFooter class="flex justify-between">
				<div class="flex space-x-2">
					{#if job.status === 'pending'}
						<Button on:click={handleAssignDriver}>
							<Car class="mr-2 h-4 w-4" />
							Assign Driver
						</Button>
					{/if}
					<Button variant="outline">
						<Pencil class="mr-2 h-4 w-4" />
						Edit Job
					</Button>
				</div>

				{#if job.status !== 'completed' && job.status !== 'cancelled'}
					<AlertDialog>
						<AlertDialogTrigger asChild let:builder>
							<Button variant="destructive" builders={[builder]}>
								<XCircle class="mr-2 h-4 w-4" />
								Cancel Job
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Cancel Job</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to cancel this job? This action cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>No, keep it</AlertDialogCancel>
								<AlertDialogAction on:click={handleCancelJob}>Yes, cancel job</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				{/if}
			</CardFooter>
		</Card>

		{#if showDriverModal}
			<DriverAssignmentModal
				jobId={job.id}
				on:close={() => (showDriverModal = false)}
				on:driverAssigned={handleDriverAssigned}
			/>
		{/if}
	{/if}
</div>

{#if showChatDialog && job && job.driver}
	<ChatDialog
		jobId={job.id}
		driverId={job.driver.id}
		driverName={job.driver.name}
		bind:open={showChatDialog}
	/>
{/if}
