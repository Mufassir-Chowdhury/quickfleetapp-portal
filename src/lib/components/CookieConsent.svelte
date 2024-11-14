<!-- src/lib/components/CookieConsent.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/components/ui/dialog';
	import { Switch } from '$lib/components/ui/switch';
	import { Cookie, X } from 'lucide-svelte';

	let showBanner = false;
	let showPreferences = false;

	// Cookie preference states
	let preferences = {
		essential: true, // Always true and disabled
		performance: true,
		functional: true
	};

	onMount(() => {
		// Check if user has already made cookie choices
		const cookieChoices = localStorage.getItem('cookie-preferences');
		if (!cookieChoices) {
			showBanner = true;
		} else {
			preferences = JSON.parse(cookieChoices);
		}
	});

	function acceptAll() {
		preferences = {
			essential: true,
			performance: true,
			functional: true
		};
		savePreferences();
	}

	function acceptSelected() {
		savePreferences();
	}

	function savePreferences() {
		localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
		showBanner = false;
		showPreferences = false;
		// Here you would typically update your analytics and tracking based on preferences
	}
</script>

{#if showBanner}
	<div class="fixed bottom-0 left-0 right-0 z-50 m-4" transition:fly={{ y: 100, duration: 300 }}>
		<Card class="mx-auto max-w-2xl shadow-lg">
			<CardHeader>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Cookie class="h-5 w-5" />
						<CardTitle>Cookie Settings</CardTitle>
					</div>
					<Button variant="ghost" size="icon" on:click={() => (showBanner = false)}>
						<X class="h-4 w-4" />
					</Button>
				</div>
				<CardDescription>
					We use cookies to enhance your browsing experience, serve personalized content, and
					analyze our traffic. Please choose your preferences below.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					<!-- Essential Cookies -->
					<div class="flex items-center justify-between">
						<div class="space-y-0.5">
							<div class="font-medium">Essential Cookies</div>
							<div class="text-sm text-muted-foreground">
								Required for the website to function properly
							</div>
						</div>
						<Switch checked disabled />
					</div>

					<!-- Performance Cookies -->
					<div class="flex items-center justify-between">
						<div class="space-y-0.5">
							<div class="font-medium">Performance Cookies</div>
							<div class="text-sm text-muted-foreground">
								Help us improve our website by collecting anonymous usage data
							</div>
						</div>
						<Switch bind:checked={preferences.performance} />
					</div>

					<!-- Functional Cookies -->
					<div class="flex items-center justify-between">
						<div class="space-y-0.5">
							<div class="font-medium">Functional Cookies</div>
							<div class="text-sm text-muted-foreground">
								Enable enhanced functionality and personalization
							</div>
						</div>
						<Switch bind:checked={preferences.functional} />
					</div>
				</div>
			</CardContent>
			<CardFooter class="flex justify-between gap-2">
				<div class="flex gap-2">
					<Button variant="outline" on:click={acceptSelected}>Accept Selected</Button>
					<Button on:click={acceptAll}>Accept All</Button>
				</div>
				<a href="/cookies" class="text-sm text-muted-foreground hover:text-primary"> Learn More </a>
			</CardFooter>
		</Card>
	</div>
{/if}

<!-- Cookie Settings Dialog -->
<Dialog bind:open={showPreferences}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Cookie Preferences</DialogTitle>
			<DialogDescription>
				Manage your cookie preferences. Essential cookies cannot be disabled as they are necessary
				for the website to function properly.
			</DialogDescription>
		</DialogHeader>

		<div class="space-y-4">
			<!-- Same cookie options as in the banner -->
			<div class="flex items-center justify-between">
				<div class="space-y-0.5">
					<div class="font-medium">Essential Cookies</div>
					<div class="text-sm text-muted-foreground">
						Required for the website to function properly
					</div>
				</div>
				<Switch checked disabled />
			</div>

			<div class="flex items-center justify-between">
				<div class="space-y-0.5">
					<div class="font-medium">Performance Cookies</div>
					<div class="text-sm text-muted-foreground">
						Help us improve our website by collecting anonymous usage data
					</div>
				</div>
				<Switch bind:checked={preferences.performance} />
			</div>

			<div class="flex items-center justify-between">
				<div class="space-y-0.5">
					<div class="font-medium">Functional Cookies</div>
					<div class="text-sm text-muted-foreground">
						Enable enhanced functionality and personalization
					</div>
				</div>
				<Switch bind:checked={preferences.functional} />
			</div>
		</div>

		<DialogFooter>
			<Button variant="outline" on:click={() => (showPreferences = false)}>Cancel</Button>
			<Button on:click={acceptSelected}>Save Preferences</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
