<!-- src/routes/+page.svelte -->
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
	import { Badge } from '$lib/components/ui/badge';
	import {
		CalendarDays,
		Car,
		Clock,
		MapPin,
		Users,
		AlertCircle,
		CheckCircle2,
		Activity,
		ClipboardList
	} from 'lucide-svelte';
	import { getDriverStatusColor } from '$lib/statusColors.js';

	const { data } = $props();
	const { stats, activeJobs, availableDrivers, recentActivity } = data.props;
</script>

<div class="container mx-auto space-y-6 p-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
			<p class="text-muted-foreground">Welcome back, Admin</p>
		</div>
		<div class="flex space-x-2">
			<a href="/jobs">
				<Button variant="outline">
					<ClipboardList class="mr-2 h-4 w-4" />
					Manage Jobs
				</Button>
			</a>
			<Button>
				<CalendarDays class="mr-2 h-4 w-4" />
				View Schedule
			</Button>
		</div>
	</div>

	<!-- Stats Overview -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Active Jobs</CardTitle>
				<Activity class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.activeJobs}</div>
				<p class="text-xs text-muted-foreground">+2 from last hour</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Available Drivers</CardTitle>
				<Users class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.availableDrivers}</div>
				<p class="text-xs text-muted-foreground">Online now</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Completed Today</CardTitle>
				<CheckCircle2 class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.completedToday}</div>
				<p class="text-xs text-muted-foreground">+8% from yesterday</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Pending Requests</CardTitle>
				<AlertCircle class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats.pendingRequests}</div>
				<p class="text-xs text-muted-foreground">Requires attention</p>
			</CardContent>
		</Card>
	</div>

	<!-- Main Content -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Active Jobs -->
		<Card class="lg:col-span-2">
			<CardHeader>
				<CardTitle>Active Jobs</CardTitle>
				<CardDescription>Overview of currently active jobs</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					{#each activeJobs as job}
						<div class="flex items-center rounded-lg border p-4">
							<div class="flex-1 space-y-1">
								<div class="flex items-center justify-between">
									<span class="font-medium">Job #{job.id}</span>
									<Badge variant="outline" class={getDriverStatusColor(job.status)}>
										{job.status}
									</Badge>
								</div>
								<div class="flex items-center text-sm text-muted-foreground">
									<MapPin class="mr-1 h-4 w-4" />
									{job.pickup} → {job.dropoff}
								</div>
								<div class="flex items-center justify-between text-sm">
									<span class="flex items-center">
										<Car class="mr-1 h-4 w-4" />
										{job.driver}
									</span>
									<span class="flex items-center">
										<Clock class="mr-1 h-4 w-4" />
										ETA: {job.estimatedTime}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" class="w-full">View All Jobs</Button>
			</CardFooter>
		</Card>

		<!-- Sidebar -->
		<div class="space-y-6">
			<!-- Available Drivers -->
			<Card>
				<CardHeader>
					<CardTitle>Available Drivers</CardTitle>
					<CardDescription>Currently active drivers</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						{#each availableDrivers as driver}
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-4">
									<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
										<Users class="h-4 w-4" />
									</div>
									<div>
										<p class="text-sm font-medium">{driver.name}</p>
										<p class="text-xs text-muted-foreground">{driver.vehicle}</p>
									</div>
								</div>
								<Badge variant="outline" class={getDriverStatusColor(driver.status)}>
									{driver.status}
								</Badge>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>

			<!-- Recent Activity -->
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>Latest updates and notifications</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						{#each recentActivity as activity}
							<div class="flex items-center">
								<div class="mr-2 h-2 w-2 rounded-full bg-primary"></div>
								<div class="flex-1">
									<p class="text-sm">{activity.message}</p>
									<p class="text-xs text-muted-foreground">{activity.time}</p>
								</div>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
