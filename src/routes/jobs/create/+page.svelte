<!-- src/routes/jobs/create/+page.svelte -->
<script lang="ts">
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
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Calendar } from '$lib/components/ui/calendar';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { CalendarIcon, MapPin, Users, Car } from 'lucide-svelte';
	import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import type { JobFormData, JobFormErrors } from '$lib/types';
	import { vehicleTypes } from '$lib/values';

	const df = new DateFormatter('en-UK', {
		dateStyle: 'long'
	});
	let formData: JobFormData = $state({
		customerName: '',
		pickup: {
			address: '',
			latitude: null,
			longitude: null
		},
		dropoff: {
			address: '',
			latitude: null,
			longitude: null
		},
		date: undefined,
		time: '',
		passengers: 1,
		vehicleType: '',
		estimatedDuration: '',
		fare: null,
		notes: ''
	});
	let selectedVehicleType = undefined;
	$effect(() => {
		formData.vehicleType
			? {
					label: formData.vehicleType,
					value: formData.vehicleType
				}
			: undefined;
	});

	let errors: JobFormErrors = $state({});
	let isSubmitting = $state(false);
	let isDatePickerOpen = $state(false);

	function validateForm(): boolean {
		errors = {};
		let isValid = true;

		if (!formData.customerName) {
			errors.customerName = 'Customer name is required';
			isValid = false;
		}

		if (!formData.pickup.address) {
			errors.pickup = 'Pickup address is required';
			isValid = false;
		}

		if (!formData.dropoff.address) {
			errors.dropoff = 'Drop-off address is required';
			isValid = false;
		}

		if (!formData.date) {
			errors.date = 'Pickup date is required';
			isValid = false;
		}

		if (!formData.time) {
			errors.time = 'Pickup time is required';
			isValid = false;
		}

		if (!formData.passengers || formData.passengers < 1) {
			errors.passengers = 'Number of passengers must be at least 1';
			isValid = false;
		}

		if (!formData.vehicleType) {
			errors.vehicleType = 'Vehicle type is required';
			isValid = false;
		}

		if (formData.fare !== null && formData.fare <= 0) {
			errors.fare = 'Fare must be greater than 0';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		if (!validateForm()) return;

		isSubmitting = true;
		try {
			// Here you would typically make an API call to your backend
			// await createJob(formData);
			console.log('Submitting job:', formData);

			// Redirect to jobs list after successful creation
			goto('/jobs');
		} catch (error) {
			console.error('Error creating job:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="container mx-auto max-w-2xl p-6">
	<Card>
		<CardHeader>
			<CardTitle>Create New Job</CardTitle>
			<CardDescription>Enter the details for the new transport job</CardDescription>
		</CardHeader>

		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-6">
				<!-- Customer Name -->
				<div class="space-y-2">
					<Label for="customerName">Customer Name</Label>
					<Input
						id="customerName"
						type="text"
						placeholder="Enter customer name"
						bind:value={formData.customerName}
					/>
					{#if errors.customerName}
						<p class="text-sm text-destructive">{errors.customerName}</p>
					{/if}
				</div>

				<!-- Pickup Location -->
				<div class="space-y-2">
					<Label for="pickup">Pickup Location</Label>
					<div class="flex space-x-2">
						<div class="relative flex-1">
							<MapPin class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								id="pickup"
								type="text"
								class="pl-8"
								placeholder="Enter pickup address"
								bind:value={formData.pickup.address}
							/>
						</div>
					</div>
					{#if errors.pickup}
						<p class="text-sm text-destructive">{errors.pickup}</p>
					{/if}
				</div>

				<!-- Drop-off Location -->
				<div class="space-y-2">
					<Label for="dropoff">Drop-off Location</Label>
					<div class="flex space-x-2">
						<div class="relative flex-1">
							<MapPin class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								id="dropoff"
								type="text"
								class="pl-8"
								placeholder="Enter drop-off address"
								bind:value={formData.dropoff.address}
							/>
						</div>
					</div>
					{#if errors.dropoff}
						<p class="text-sm text-destructive">{errors.dropoff}</p>
					{/if}
				</div>

				<!-- Number of Passengers and Vehicle Type -->
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="passengers">Number of Passengers</Label>
						<div class="relative">
							<Users class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								id="passengers"
								type="number"
								min="1"
								class="pl-8"
								bind:value={formData.passengers}
							/>
						</div>
						{#if errors.passengers}
							<p class="text-sm text-destructive">{errors.passengers}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<Label for="vehicleType">Vehicle Type</Label>
						<Select
							selected={selectedVehicleType}
							onSelectedChange={(v) => {
								if (v) {
									formData.vehicleType = v.value as string;
								}
							}}
						>
							<SelectTrigger id="vehicleType" class="w-full">
								<div class="flex items-center">
									<Car class="mr-2 h-4 w-4 text-muted-foreground" />
									<SelectValue placeholder="Select vehicle type" />
								</div>
							</SelectTrigger>
							<SelectContent>
								{#each vehicleTypes as vehicle}
									<SelectItem value={vehicle.value}>{vehicle.label}</SelectItem>
								{/each}
							</SelectContent>
						</Select>
						<input hidden bind:value={formData.vehicleType} name="Vehicle Type" />
						{#if errors.vehicleType}
							<p class="text-sm text-destructive">{errors.vehicleType}</p>
						{/if}
					</div>
				</div>

				<!-- Date and Time -->
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label>Pickup Date</Label>
						<Popover bind:open={isDatePickerOpen}>
							<PopoverTrigger asChild let:builder>
								<Button
									builders={[builder]}
									variant="outline"
									class={`w-full justify-start text-left font-normal ${!formData.date && 'text-muted-foreground'}`}
								>
									<CalendarIcon class="mr-2 h-4 w-4" />
									{formData.date
										? df.format(formData.date.toDate(getLocalTimeZone()))
										: 'Select date'}
								</Button>
							</PopoverTrigger>
							<PopoverContent class="w-auto p-0">
								<Calendar bind:value={formData.date} initialFocus />
							</PopoverContent>
						</Popover>
						{#if errors.date}
							<p class="text-sm text-destructive">{errors.date}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<Label for="time">Pickup Time</Label>
						<Input id="time" type="time" bind:value={formData.time} />
						{#if errors.time}
							<p class="text-sm text-destructive">{errors.time}</p>
						{/if}
					</div>
				</div>

				<!-- Estimated Duration -->
				<div class="space-y-2">
					<Label for="duration">Estimated Duration</Label>
					<Input
						id="duration"
						type="text"
						placeholder="e.g., 30 minutes"
						bind:value={formData.estimatedDuration}
					/>
				</div>

				<!-- Fare -->
				<div class="space-y-2">
					<Label for="fare">Estimated Fare (£)</Label>
					<Input
						id="fare"
						type="number"
						step="0.01"
						placeholder="0.00"
						bind:value={formData.fare}
					/>
					{#if errors.fare}
						<p class="text-sm text-destructive">{errors.fare}</p>
					{/if}
				</div>

				<!-- Notes -->
				<div class="space-y-2">
					<Label for="notes">Additional Notes</Label>
					<Textarea
						id="notes"
						placeholder="Enter any special instructions or requirements"
						bind:value={formData.notes}
					/>
				</div>
			</form>
		</CardContent>

		<CardFooter class="flex justify-between">
			<a href="/jobs">
				<Button variant="outline">Cancel</Button>
			</a>
			<Button on:click={handleSubmit} disabled={isSubmitting}>
				{isSubmitting ? 'Creating...' : 'Create Job'}
			</Button>
		</CardFooter>
	</Card>
</div>
