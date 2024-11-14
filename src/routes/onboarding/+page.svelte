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
		ArrowLeft
	} from 'lucide-svelte';

	// Onboarding steps
	const steps = [
		{
			title: 'Welcome to QuickFleet',
			description: 'Streamline your taxi operations with our powerful management platform',
			icon: Car,
			content: [
				'Efficiently manage job requests and driver assignments',
				'Real-time tracking and communication',
				'Comprehensive reporting and analytics',
				'GDPR-compliant data handling'
			]
		},
		{
			title: 'Managing Jobs',
			description: 'Learn how to create and manage transport jobs',
			icon: ClipboardList,
			content: [
				'Create new jobs with pickup and drop-off locations',
				'Set estimated fares and journey times',
				'Track job status in real-time',
				'View detailed job history'
			]
		},
		{
			title: 'Driver Coordination',
			description: 'Efficiently coordinate with your driver network',
			icon: Users,
			content: [
				'View available drivers in your area',
				'Assign jobs to nearby drivers',
				'Monitor driver status and location',
				'Manage driver profiles and performance'
			]
		},
		{
			title: 'Communication Tools',
			description: 'Stay connected with your team',
			icon: MessageSquare,
			content: [
				'Direct messaging with drivers',
				'Real-time notifications for job updates',
				'Automated status alerts',
				'Emergency contact system'
			]
		},
		{
			title: 'Location Services',
			description: 'Optimize routes and tracking',
			icon: Map,
			content: [
				'View jobs within operating radius',
				'Get estimated travel times',
				'Track active journeys',
				'Access journey history'
			]
		}
	];

	let currentStep = 0;
	let progress = 0;

	$: progress = ((currentStep + 1) / steps.length) * 100;

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
		</div>

		<Card class="mx-auto max-w-4xl">
			<CardHeader>
				<div class="flex items-center space-x-4">
					<div class="rounded-full bg-primary/10 p-2">
						<svelte:component this={steps[currentStep].icon} class="h-8 w-8 text-primary" />
					</div>
					<div>
						<CardTitle class="text-2xl">{steps[currentStep].title}</CardTitle>
						<CardDescription>{steps[currentStep].description}</CardDescription>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div class="space-y-6">
					<div class="grid gap-6 md:grid-cols-2">
						{#each steps[currentStep].content as item}
							<div class="flex items-start space-x-2">
								<CheckCircle2 class="mt-0.5 h-5 w-5 text-primary" />
								<span>{item}</span>
							</div>
						{/each}
					</div>

					{#if currentStep === 0}
						<div class="rounded-lg bg-muted p-4">
							<p class="text-sm text-muted-foreground">
								Welcome to QuickFleet! This guide will help you get started with our platform. Take
								a few minutes to learn about the key features that will help you manage your taxi
								operations more efficiently.
							</p>
						</div>
					{/if}
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
