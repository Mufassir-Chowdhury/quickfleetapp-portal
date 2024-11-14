<!-- src/routes/login/+page.svelte -->
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
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Mail, Lock, AlertCircle } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let error: string | null = null;

	function handleLogin(event: SubmitEvent) {
		event.preventDefault();
		// Login functionality will be added later
		console.log('Login attempted with:', { email, password });
		goto('/');
	}
</script>

<div class="grid min-h-screen place-items-center bg-background px-4">
	<div class="w-full max-w-md">
		<Card>
			<CardHeader class="space-y-1">
				<div class="mb-4 flex justify-center">
					<!-- You can add your logo here -->
					<span class="text-2xl font-bold">QuickFleet</span>
				</div>
				<CardTitle class="text-center text-2xl">Welcome back</CardTitle>
				<CardDescription class="text-center">
					Enter your credentials to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				{#if error}
					<Alert variant="destructive" class="mb-4">
						<AlertCircle class="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				{/if}

				<form on:submit={handleLogin} class="space-y-4">
					<div class="space-y-2">
						<Label for="email">Email</Label>
						<div class="relative">
							<Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								id="email"
								type="email"
								placeholder="name@company.com"
								class="pl-9"
								bind:value={email}
								required
							/>
						</div>
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<Label for="password">Password</Label>
							<a href="/reset-password" class="text-sm text-primary hover:underline">
								Forgot password?
							</a>
						</div>
						<div class="relative">
							<Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input id="password" type="password" class="pl-9" bind:value={password} required />
						</div>
					</div>

					<Button type="submit" class="w-full" disabled={loading}>
						{#if loading}
							<span>Logging in...</span>
						{:else}
							<span>Login</span>
						{/if}
					</Button>
				</form>
			</CardContent>
			<CardFooter>
				<p class="w-full text-center text-sm text-muted-foreground">
					Don't have an account?
					<a href="/signup" class="text-primary hover:underline">Contact support</a>
				</p>
			</CardFooter>
		</Card>
	</div>
</div>
