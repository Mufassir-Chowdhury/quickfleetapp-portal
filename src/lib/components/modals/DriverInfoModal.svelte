<!-- src/lib/components/modals/DriverInfoModal.svelte -->
<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { Badge } from '$lib/components/ui/badge';
	import { Car, Phone, Star, Mail, MapPin, Shield, Timer } from 'lucide-svelte';
	import { getDriverStatusColor } from '$lib/statusColors';

	let { id = 'DRV001', name = 'John Doe' } = $props();
	let show = $state(false);
	let driver: {
		id: string;
		name: string;
		photo: string;
		vehicle: string;
		phoneNumber: string;
		lastActive: string;
		email: string;
		status: string;
		rating: number;
		completedJobs: number;
		location: string;
		verified: boolean;
		activeHours: string;
	} = {
		id: id,
		name: name,
		vehicle: 'SUV',
		phoneNumber: '+44 123 456 7890',
		status: 'available',
		lastActive: '2 mins ago',
		photo: '/images/drivers/driver-1.jpg',
		email: 'johndoe@quickfleetapp.com',
		rating: 4.8,
		completedJobs: 156,
		location: 'London, UK',
		verified: true,
		activeHours: '8:00 AM - 6:00 PM'
	};
</script>

<button onclick={() => (show = true)} class="text-blue-600 underline">{name}</button>
<Dialog open={show} onOpenChange={(open) => (show = open)}>
	<DialogContent class="sm:max-w-lg">
		<DialogHeader>
			<DialogTitle>Driver Information</DialogTitle>
			<DialogDescription>Detailed information about the driver</DialogDescription>
		</DialogHeader>

		<div class="mt-4 grid gap-6">
			<!-- Driver Header -->
			<div class="flex items-start space-x-4">
				<div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
					<img
						src={driver.photo || '/api/placeholder/80/80'}
						alt={driver.name}
						class="h-full w-full object-cover"
					/>
				</div>
				<div class="flex-1">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold">{driver.name}</h3>
						<Badge variant="outline" class={getDriverStatusColor(driver.status)}>
							{driver.status}
						</Badge>
					</div>
					<div class="mt-1 flex items-center space-x-2">
						<Star class="h-4 w-4 text-yellow-400" />
						<span class="text-sm">{driver.rating} / 5.0</span>
						<span class="text-sm text-muted-foreground">
							({driver.completedJobs} jobs completed)
						</span>
					</div>
				</div>
			</div>

			<!-- Driver Details -->
			<div class="grid gap-4">
				<div class="flex items-center space-x-2">
					<Car class="h-4 w-4 text-muted-foreground" />
					<span class="text-sm text-muted-foreground">Vehicle:</span>
					<span class="text-sm">{driver.vehicle}</span>
				</div>

				<div class="flex items-center space-x-2">
					<Phone class="h-4 w-4 text-muted-foreground" />
					<span class="text-sm text-muted-foreground">Phone:</span>
					<a href={`tel:${driver.phoneNumber}`} class="text-sm text-primary hover:underline">
						{driver.phoneNumber}
					</a>
				</div>

				<div class="flex items-center space-x-2">
					<Mail class="h-4 w-4 text-muted-foreground" />
					<span class="text-sm text-muted-foreground">Email:</span>
					<a href={`mailto:${driver.email}`} class="text-sm text-primary hover:underline">
						{driver.email}
					</a>
				</div>

				<div class="flex items-center space-x-2">
					<MapPin class="h-4 w-4 text-muted-foreground" />
					<span class="text-sm text-muted-foreground">Current Location:</span>
					<span class="text-sm">{driver.location}</span>
				</div>

				<div class="flex items-center space-x-2">
					<Timer class="h-4 w-4 text-muted-foreground" />
					<span class="text-sm text-muted-foreground">Active Hours:</span>
					<span class="text-sm">{driver.activeHours}</span>
				</div>

				{#if driver.verified}
					<div class="flex items-center space-x-2">
						<Shield class="h-4 w-4 text-green-500" />
						<span class="text-sm text-green-600">Verified Driver</span>
					</div>
				{/if}
			</div>
		</div>
	</DialogContent>
</Dialog>
