<!-- src/lib/components/modals/DriverAssignmentModal.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogFooter
	} from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Search, Car, MapPin, Phone } from 'lucide-svelte';

	export let jobId: string;

	const dispatch = createEventDispatcher();

	interface Driver {
		id: string;
		name: string;
		vehicle: string;
		vehicleType: string;
		status: 'available' | 'busy' | 'offline';
		lastLocation: string;
		distance: number;
		phoneNumber: string;
	}

	let searchQuery = '';
	let selectedDriver: string | null = null;
	let isLoading = false;

	// Sample data - Replace with actual API call
	let drivers: Driver[] = [
		{
			id: 'DRV001',
			name: 'John Doe',
			vehicle: 'Toyota Camry',
			vehicleType: 'sedan',
			status: 'available',
			lastLocation: 'Oxford Street',
			distance: 1.2,
			phoneNumber: '+44 7700 900123'
		},
		{
			id: 'DRV002',
			name: 'Jane Smith',
			vehicle: 'Honda CR-V',
			vehicleType: 'suv',
			status: 'available',
			lastLocation: 'Baker Street',
			distance: 2.5,
			phoneNumber: '+44 7700 900456'
		}
	];

	let filteredDrivers = drivers;

	function getStatusColor(status: Driver['status']): string {
		const colors = {
			available: 'bg-green-100 text-green-800',
			busy: 'bg-yellow-100 text-yellow-800',
			offline: 'bg-gray-100 text-gray-800'
		};
		return colors[status] || 'bg-gray-100 text-gray-800';
	}

	function filterDrivers() {
		if (!searchQuery) {
			filteredDrivers = drivers;
			return;
		}

		filteredDrivers = drivers.filter(
			(driver) =>
				driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				driver.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
				driver.lastLocation.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	$: {
		searchQuery;
		filterDrivers();
	}

	function handleClose() {
		dispatch('close');
	}

	async function handleAssign() {
		if (!selectedDriver) return;

		isLoading = true;
		try {
			// In real app, make API call to assign driver
			console.log('Assigning driver:', selectedDriver, 'to job:', jobId);
			dispatch('driverAssigned', { driverId: selectedDriver });
		} catch (error) {
			console.error('Error assigning driver:', error);
		} finally {
			isLoading = false;
		}
	}

	function formatDistance(distance: number): string {
		return `${distance.toFixed(1)} miles away`;
	}
</script>

<Dialog open={true} on:close={handleClose}>
	<DialogContent class="max-w-2xl">
		<DialogHeader>
			<DialogTitle>Assign Driver</DialogTitle>
			<DialogDescription>Select an available driver to assign to this job</DialogDescription>
		</DialogHeader>

		<!-- Search Bar -->
		<div class="relative">
			<Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input type="text" placeholder="Search drivers..." class="pl-8" bind:value={searchQuery} />
		</div>

		<!-- Drivers List -->
		<div class="max-h-[400px] space-y-4 overflow-y-auto">
			{#each filteredDrivers as driver}
				<div
					class="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
					class:bg-accent={selectedDriver === driver.id}
					on:click={() => (selectedDriver = driver.id)}
					on:keydown={(e) => e.key === 'Enter' && (selectedDriver = driver.id)}
					role="button"
					tabindex="0"
				>
					<div class="flex items-start justify-between">
						<div class="space-y-1">
							<div class="flex items-center space-x-2">
								<span class="font-medium">{driver.name}</span>
								<Badge variant="outline" class={getStatusColor(driver.status)}>
									{driver.status}
								</Badge>
							</div>

							<div class="grid gap-1 text-sm">
								<div class="flex items-center text-muted-foreground">
									<Car class="mr-1 h-4 w-4" />
									{driver.vehicle}
								</div>
								<div class="flex items-center text-muted-foreground">
									<MapPin class="mr-1 h-4 w-4" />
									{driver.lastLocation} ({formatDistance(driver.distance)})
								</div>
								<div class="flex items-center text-muted-foreground">
									<Phone class="mr-1 h-4 w-4" />
									{driver.phoneNumber}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}

			{#if filteredDrivers.length === 0}
				<div class="p-4 text-center text-muted-foreground">
					No drivers found matching your search
				</div>
			{/if}
		</div>

		<DialogFooter>
			<Button variant="outline" on:click={handleClose}>Cancel</Button>
			<Button on:click={handleAssign} disabled={!selectedDriver || isLoading}>
				{isLoading ? 'Assigning...' : 'Assign Driver'}
			</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
