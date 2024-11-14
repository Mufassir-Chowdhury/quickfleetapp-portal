<!-- src/lib/components/layouts/LegalLayout.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, FileText } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let title: string;
	export let description: string;
	export let lastUpdated: string;

	const legalPages = [
		{ href: '/terms', label: 'Terms of Service' },
		{ href: '/privacy', label: 'Privacy Policy' },
		{ href: '/cookies', label: 'Cookie Policy' },
		{ href: '/gdpr', label: 'GDPR' }
	];
</script>

<div class="container mx-auto px-4 py-6 lg:px-8">
	<!-- Back button -->
	<Button variant="ghost" class="mb-6" on:click={() => goto('/')}>
		<ArrowLeft class="mr-2 h-4 w-4" />
		Back to Home
	</Button>

	<div class="grid gap-6 md:grid-cols-[250px_1fr]">
		<!-- Sidebar -->
		<Card class="h-fit">
			<CardHeader>
				<CardTitle class="text-lg">Legal Center</CardTitle>
			</CardHeader>
			<CardContent>
				<nav class="flex flex-col space-y-1">
					{#each legalPages as { href, label }}
						<a
							{href}
							class="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent
                {$page.url.pathname === href ? 'bg-accent' : ''}"
						>
							<FileText class="mr-2 h-4 w-4" />
							{label}
						</a>
					{/each}
				</nav>
			</CardContent>
		</Card>

		<!-- Main Content -->
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					{description}
					<div class="mt-1 text-xs">
						Last updated: {lastUpdated}
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="prose dark:prose-invert max-w-none">
					<slot />
				</div>
			</CardContent>
		</Card>
	</div>
</div>
