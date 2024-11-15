<!-- src/routes/activity/+page.svelte -->
<script lang="ts">
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
	import { Badge } from '$lib/components/ui/badge';
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbList,
		BreadcrumbSeparator
	} from '$lib/components/ui/breadcrumb';
	import {
		Search,
		Filter,
		Calendar,
		Car,
		User,
		MessageSquare,
		CheckCircle,
		XCircle,
		AlertTriangle,
		Home
	} from 'lucide-svelte';

	let searchQuery = $state('');
	let activityFilter = $state('all');
	let selectedDate = $state(new Date().toISOString().split('T')[0]);

	// Sample activities data - in real app, fetch from PocketBase
	let activities = $state([
		{
			id: 1,
			type: 'job_created',
			message: 'New job #1234 created',
			timestamp: '2024-11-14T10:30:00Z',
			user: 'Admin',
			jobId: '1234'
		},
		{
			id: 2,
			type: 'job_assigned',
			message: 'Job #1234 assigned to John Doe',
			timestamp: '2024-11-14T10:35:00Z',
			user: 'Admin',
			jobId: '1234',
			driverId: '5678'
		}
		// Add more sample activities
	]);

	function getActivityIcon(type: string) {
		switch (type) {
			case 'job_created':
				return Car;
			case 'job_assigned':
				return User;
			case 'job_completed':
				return CheckCircle;
			case 'job_cancelled':
				return XCircle;
			case 'message':
				return MessageSquare;
			default:
				return AlertTriangle;
		}
	}

	function getActivityColor(type: string) {
		switch (type) {
			case 'job_created':
				return 'bg-blue-100 text-blue-800';
			case 'job_assigned':
				return 'bg-purple-100 text-purple-800';
			case 'job_completed':
				return 'bg-green-100 text-green-800';
			case 'job_cancelled':
				return 'bg-red-100 text-red-800';
			case 'message':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-yellow-100 text-yellow-800';
		}
	}

	function formatDateTime(dateString: string): string {
		return new Date(dateString).toLocaleString('en-GB', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function filterActivities() {
		// Implement filtering logic based on searchQuery, activityFilter, and selectedDate
		// This is where you'd typically query PocketBase with filters
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
			<BreadcrumbItem>Activity Log</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>

	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Activity Log</h1>
			<p class="text-muted-foreground">Track all system activities and events</p>
		</div>
	</div>

	<!-- Filters -->
	<Card>
		<CardContent class="p-4">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="flex items-center space-x-2">
					<Search class="h-4 w-4 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search activities..."
						bind:value={searchQuery}
						on:input={filterActivities}
					/>
				</div>
				<div class="flex items-center space-x-2">
					<Filter class="h-4 w-4 text-muted-foreground" />
					<select
						class="w-full rounded-md border border-input bg-background px-3 py-2"
						bind:value={activityFilter}
						onchange={filterActivities}
					>
						<option value="all">All Activities</option>
						<option value="job_created">Job Created</option>
						<option value="job_assigned">Job Assigned</option>
						<option value="job_completed">Job Completed</option>
						<option value="job_cancelled">Job Cancelled</option>
						<option value="message">Messages</option>
					</select>
				</div>
				<div class="flex items-center space-x-2">
					<Calendar class="h-4 w-4 text-muted-foreground" />
					<Input type="date" bind:value={selectedDate} on:change={filterActivities} />
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- Activity List -->
	<Card>
		<CardHeader>
			<CardTitle>Activities</CardTitle>
			<CardDescription>
				Showing {activities.length} activities
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				{#each activities as activity}
					{@const Icon = getActivityIcon(activity.type)}
					<div class="flex items-start space-x-4 rounded-lg border p-4">
						<div class="mt-0.5">
							<Icon class="h-5 w-5" />
						</div>
						<div class="flex-1 space-y-1">
							<div class="flex items-center justify-between">
								<p class="text-sm font-medium">{activity.message}</p>
								<Badge variant="outline" class={getActivityColor(activity.type)}>
									{activity.type.replace('_', ' ')}
								</Badge>
							</div>
							<div class="flex items-center space-x-2 text-sm text-muted-foreground">
								<span>{activity.user}</span>
								<span>•</span>
								<span>{formatDateTime(activity.timestamp)}</span>
								{#if activity.jobId}
									<span>•</span>
									<a href="/jobs/{activity.jobId}" class="hover:underline"> View Job </a>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</CardContent>
		<CardFooter class="flex justify-between">
			<Button variant="outline">Previous</Button>
			<Button variant="outline">Next</Button>
		</CardFooter>
	</Card>
</div>
