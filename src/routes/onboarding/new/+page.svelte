<!-- src/routes/onboarding/+page.svelte -->
<script lang="ts">
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
	import { Progress } from '$lib/components/ui/progress';
	import {
		Car,
		Users,
		MessageSquare,
		ClipboardList,
		Map,
		CheckCircle2,
		ArrowRight,
		ArrowLeft,
		MapPin,
		Clock,
		UserCircle,
		AlertCircle
	} from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label';
	import { Badge } from '$lib/components/ui/badge';

	// Enhanced onboarding steps with visual examples
	const steps = [
		{
			title: 'Welcome to QuickFleet',
			description: 'Your complete taxi fleet management solution',
			icon: Car,
			content: {
				mainPoints: [
					'Streamlined job management',
					'Real-time driver coordination',
					'Instant communication',
					'Location tracking'
				],
				visualization: 'welcome-dashboard',
				demo: {
					type: 'dashboard',
					data: {
						activeJobs: 5,
						availableDrivers: 8,
						completedToday: 25,
						efficiency: '94%'
					}
				}
			}
		},
		{
			title: 'Creating Your First Job',
			description: 'Learn how to create and manage transport jobs',
			icon: ClipboardList,
			content: {
				mainPoints: [
					'Set pickup and drop-off locations',
					'Specify passenger details',
					'Add special instructions',
					'Set fare estimates'
				],
				visualization: 'job-form',
				demo: {
					type: 'form',
					fields: [
						{
							label: 'Pickup Location',
							icon: MapPin,
							placeholder: '123 Main St, London'
						},
						{
							label: 'Drop-off Location',
							icon: MapPin,
							placeholder: '456 High St, London'
						},
						{
							label: 'Pickup Time',
							icon: Clock,
							type: 'time'
						}
					]
				}
			}
		},
		{
			title: 'Driver Assignment',
			description: 'Find and assign the perfect driver',
			icon: Users,
			content: {
				mainPoints: [
					'View available drivers nearby',
					'Check driver ratings and status',
					'One-click assignment',
					'Real-time driver responses'
				],
				visualization: 'driver-list',
				demo: {
					type: 'driver-cards',
					drivers: [
						{
							name: 'John Smith',
							status: 'Available',
							vehicle: 'Toyota Prius',
							rating: 4.8
						},
						{
							name: 'Sarah Williams',
							status: 'On Job',
							vehicle: 'Tesla Model 3',
							rating: 4.9
						}
					]
				}
			}
		},
		{
			title: 'Live Tracking',
			description: 'Monitor your fleet in real-time',
			icon: Map,
			content: {
				mainPoints: [
					'Track active jobs on the map',
					'Get real-time ETAs',
					'View driver locations',
					'Monitor journey progress'
				],
				visualization: 'map-view',
				demo: {
					type: 'map',
					features: ['Active job routes', 'Driver locations', 'Traffic updates', 'Zone coverage']
				}
			}
		},
		{
			title: 'Communication Hub',
			description: 'Stay connected with your team',
			icon: MessageSquare,
			content: {
				mainPoints: [
					'Instant messaging with drivers',
					'Automated status updates',
					'Emergency alerts',
					'Customer notifications'
				],
				visualization: 'chat-interface',
				demo: {
					type: 'chat',
					messages: [
						{
							sender: 'Driver',
							message: 'Arrived at pickup location'
						},
						{
							sender: 'System',
							message: 'Customer notified of arrival'
						}
					]
				}
			}
		}
	];

	let currentStep = 0;
	let progress = 0;

	$: progress = ((currentStep + 1) / steps.length) * 100;

	// Helper function to format demo data
	function formatDemoValue(value: string | number) {
		if (typeof value === 'number') {
			if (value > 100) return value.toLocaleString();
			return value.toString();
		}
		return value;
	}

	function nextStep() {
		if (currentStep < steps.length - 1) {
			currentStep++;
		} else {
			completeOnboarding();
		}
	}

	function previousStep() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	function completeOnboarding() {
		// Here you would typically save the onboarding completion status
		goto('/');
	}

	function skipOnboarding() {
		if (
			confirm(
				'Are you sure you want to skip the guide? You can always access it later from settings.'
			)
		) {
			goto('/');
		}
	}
</script>

<div class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8">
		<div class="mb-8">
			<Progress value={progress} class="w-full" />
			<p class="mt-2 text-center text-sm text-muted-foreground">
				Step {currentStep + 1} of {steps.length}
			</p>
		</div>

		<Card class="mx-auto max-w-4xl">
			<CardHeader>
				<div class="flex items-center space-x-4">
					<div class="rounded-full bg-primary/10 p-3">
						<svelte:component this={steps[currentStep].icon} class="h-8 w-8 text-primary" />
					</div>
					<div>
						<CardTitle class="text-2xl">{steps[currentStep].title}</CardTitle>
						<CardDescription>{steps[currentStep].description}</CardDescription>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div class="space-y-8">
					<!-- Main Points -->
					<div class="grid gap-4 md:grid-cols-2">
						{#each steps[currentStep].content.mainPoints as point}
							<div class="flex items-start space-x-2">
								<CheckCircle2 class="mt-0.5 h-5 w-5 text-primary" />
								<span>{point}</span>
							</div>
						{/each}
					</div>

					<!-- Interactive Demo Area -->
					<div class="rounded-lg border bg-muted/50 p-6">
						{#if steps[currentStep].content.demo.type === 'dashboard'}
							<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
								{#each Object.entries(steps[currentStep].content.demo.data) as [key, value]}
									<Card>
										<CardHeader class="p-4">
											<CardTitle class="text-xl">{formatDemoValue(value)}</CardTitle>
											<CardDescription>{key.replace(/([A-Z])/g, ' $1').trim()}</CardDescription>
										</CardHeader>
									</Card>
								{/each}
							</div>
						{:else if steps[currentStep].content.demo.type === 'form'}
							<div class="space-y-4">
								{#each steps[currentStep].content.demo.fields as field}
									<div class="space-y-2">
										<Label>{field.label}</Label>
										<div class="relative">
											<svelte:component
												this={field.icon}
												class="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
											/>
											<input
												type={field.type || 'text'}
												placeholder={field.placeholder}
												class="w-full rounded-md border border-input bg-background px-3 py-2 pl-10"
												disabled
											/>
										</div>
									</div>
								{/each}
							</div>
						{:else if steps[currentStep].content.demo.type === 'driver-cards'}
							<div class="grid gap-4 md:grid-cols-2">
								{#each steps[currentStep].content.demo.drivers as driver}
									<Card>
										<CardContent class="p-4">
											<div class="flex items-start justify-between">
												<div class="space-y-1">
													<div class="flex items-center space-x-2">
														<UserCircle class="h-5 w-5" />
														<span class="font-medium">{driver.name}</span>
													</div>
													<div class="text-sm text-muted-foreground">
														{driver.vehicle}
													</div>
													<div class="flex items-center space-x-1">
														<span class="text-sm">★</span>
														<span class="text-sm">{driver.rating}</span>
													</div>
												</div>
												<Badge variant={driver.status === 'Available' ? 'default' : 'secondary'}>
													{driver.status}
												</Badge>
											</div>
										</CardContent>
									</Card>
								{/each}
							</div>
						{:else if steps[currentStep].content.demo.type === 'map'}
							<div class="space-y-4">
								<div
									class="flex aspect-video items-center justify-center rounded-lg border bg-muted"
								>
									<Map class="h-12 w-12 text-muted-foreground" />
								</div>
								<div class="grid grid-cols-2 gap-2 text-sm">
									{#each steps[currentStep].content.demo.features as feature}
										<div class="flex items-center space-x-2">
											<CheckCircle2 class="h-4 w-4 text-primary" />
											<span>{feature}</span>
										</div>
									{/each}
								</div>
							</div>
						{:else if steps[currentStep].content.demo.type === 'chat'}
							<div class="space-y-4">
								{#each steps[currentStep].content.demo.messages as message}
									<div
										class="flex items-start space-x-2 {message.sender === 'Driver'
											? 'justify-end'
											: ''}"
									>
										<div class="max-w-[80%] rounded-lg bg-primary/10 p-3">
											<p class="text-sm font-medium">{message.sender}</p>
											<p class="text-sm">{message.message}</p>
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Helpful Tip -->
					<div class="flex items-start space-x-2 rounded-lg bg-primary/5 p-4 text-sm">
						<AlertCircle class="mt-0.5 h-5 w-5 text-primary" />
						<div>
							<span class="font-medium">Pro Tip:</span>
							<p class="text-muted-foreground">
								{#if currentStep === 0}
									Use the dashboard to get a quick overview of your operations at any time.
								{:else if currentStep === 1}
									You can save frequently used locations as templates for faster job creation.
								{:else if currentStep === 2}
									Click on a driver's card to view their full profile and performance history.
								{:else if currentStep === 3}
									Use the map filters to focus on specific areas or driver types.
								{:else}
									Set up message templates for common situations to save time.
								{/if}
							</p>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter class="flex justify-between">
				<div class="flex space-x-2">
					{#if currentStep > 0}
						<Button variant="outline" on:click={previousStep}>
							<ArrowLeft class="mr-2 h-4 w-4" />
							Previous
						</Button>
					{/if}
					<Button variant="ghost" on:click={skipOnboarding}>Skip Guide</Button>
				</div>

				<Button on:click={nextStep}>
					{#if currentStep === steps.length - 1}
						Get Started
					{:else}
						Next
						<ArrowRight class="ml-2 h-4 w-4" />
					{/if}
				</Button>
			</CardFooter>
		</Card>

		<div class="mt-8 text-center text-sm text-muted-foreground">
			<p>
				Need help? Contact our support team at
				<a href="mailto:support@quickfleet.com" class="text-primary hover:underline">
					support@quickfleet.com
				</a>
			</p>
		</div>
	</div>
</div>
