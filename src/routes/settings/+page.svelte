<!-- src/routes/settings/+page.svelte -->
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
	import { Switch } from '$lib/components/ui/switch';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import {
		Settings,
		Bell,
		Building2,
		Mail,
		Phone,
		Users,
		Shield,
		MessageSquare,
		Home,
		Compass,
		HelpCircle,
		FileText,
		Video
	} from 'lucide-svelte';

	let profile = $state({
		name: 'Admin User',
		email: 'admin@example.com',
		phone: '+44 123 456 7890'
	});

	let company = $state({
		name: 'Quickfleet Taxi',
		address: '123 Fleet Street, London',
		phone: '+44 20 1234 5678',
		operatingRadius: '10'
	});

	let notifications = $state({
		emailNotifications: true,
		pushNotifications: true,
		smsNotifications: false,
		newJobs: true,
		jobUpdates: true,
		driverUpdates: true,
		systemAlerts: true,
		showNewUserGuide: true,
		showFeatureTips: true
	});

	const roles = $state([
		{ id: 1, name: 'Admin', description: 'Full system access' },
		{ id: 2, name: 'Operator', description: 'Can manage jobs and drivers' },
		{ id: 3, name: 'Dispatcher', description: 'Can only view and assign jobs' }
	]);

	function handleProfileUpdate(e: { preventDefault: () => void }) {
		e.preventDefault();
		// In real app, make API call to update profile
		console.log('Profile updated:', profile);
	}

	function handleCompanyUpdate(e: { preventDefault: () => void }) {
		e.preventDefault();
		// In real app, make API call to update company settings
		console.log('Company settings updated:', company);
	}

	function handleNotificationUpdate(e: { preventDefault: () => void }) {
		e.preventDefault();
		// In real app, make API call to update notification preferences
		console.log('Notification settings updated:', notifications);
	}
</script>

<div class="container mx-auto space-y-6 p-6">
	<div class="mb-6 flex items-center space-x-2">
		<Settings class="h-6 w-6" />
		<h1 class="text-3xl font-bold tracking-tight">Settings</h1>
	</div>

	<Tabs value="profile" class="space-y-4">
		<TabsList>
			<TabsTrigger value="profile">Profile</TabsTrigger>
			<TabsTrigger value="company">Company</TabsTrigger>
			<TabsTrigger value="notifications">Notifications</TabsTrigger>
			<TabsTrigger value="access">Access Control</TabsTrigger>
			<TabsTrigger value="onboarding">Onboarding & Help</TabsTrigger>
		</TabsList>

		<!-- Profile Settings -->
		<TabsContent value="profile">
			<Card>
				<CardHeader>
					<CardTitle>Profile Settings</CardTitle>
					<CardDescription>Manage your account settings and preferences</CardDescription>
				</CardHeader>
				<CardContent>
					<form onsubmit={handleProfileUpdate} class="space-y-4">
						<div class="space-y-2">
							<Label for="name">Name</Label>
							<Input id="name" bind:value={profile.name} />
						</div>
						<div class="space-y-2">
							<Label for="email">Email</Label>
							<div class="flex items-center space-x-2">
								<Mail class="h-4 w-4 text-muted-foreground" />
								<Input id="email" type="email" bind:value={profile.email} />
							</div>
						</div>
						<div class="space-y-2">
							<Label for="phone">Phone Number</Label>
							<div class="flex items-center space-x-2">
								<Phone class="h-4 w-4 text-muted-foreground" />
								<Input id="phone" bind:value={profile.phone} />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button on:click={handleProfileUpdate}>Save Changes</Button>
				</CardFooter>
			</Card>
		</TabsContent>

		<!-- Company Settings -->
		<TabsContent value="company">
			<Card>
				<CardHeader>
					<CardTitle>Company Settings</CardTitle>
					<CardDescription>Manage your company information and operational settings</CardDescription
					>
				</CardHeader>
				<CardContent>
					<form onsubmit={handleCompanyUpdate} class="space-y-4">
						<div class="space-y-2">
							<Label for="companyName">Company Name</Label>
							<div class="flex items-center space-x-2">
								<Building2 class="h-4 w-4 text-muted-foreground" />
								<Input id="companyName" bind:value={company.name} />
							</div>
						</div>
						<div class="space-y-2">
							<Label for="address">Business Address</Label>
							<div class="flex items-center space-x-2">
								<Home class="h-4 w-4 text-muted-foreground" />
								<Input id="address" bind:value={company.address} />
							</div>
						</div>
						<div class="space-y-2">
							<Label for="companyPhone">Business Phone</Label>
							<div class="flex items-center space-x-2">
								<Phone class="h-4 w-4 text-muted-foreground" />
								<Input id="companyPhone" bind:value={company.phone} />
							</div>
						</div>
						<div class="space-y-2">
							<Label for="radius">Operating Radius (miles)</Label>
							<Input id="radius" type="number" bind:value={company.operatingRadius} />
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button on:click={handleCompanyUpdate}>Save Changes</Button>
				</CardFooter>
			</Card>
		</TabsContent>

		<!-- Notification Settings -->
		<TabsContent value="notifications">
			<Card>
				<CardHeader>
					<CardTitle>Notification Preferences</CardTitle>
					<CardDescription>Choose how you want to receive notifications</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-6">
						<div class="space-y-4">
							<h3 class="text-lg font-medium">Notification Channels</h3>
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-2">
										<Mail class="h-4 w-4 text-muted-foreground" />
										<Label for="emailNotifications">Email Notifications</Label>
									</div>
									<Switch id="emailNotifications" bind:checked={notifications.emailNotifications} />
								</div>
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-2">
										<Bell class="h-4 w-4 text-muted-foreground" />
										<Label for="pushNotifications">Push Notifications</Label>
									</div>
									<Switch id="pushNotifications" bind:checked={notifications.pushNotifications} />
								</div>
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-2">
										<MessageSquare class="h-4 w-4 text-muted-foreground" />
										<Label for="smsNotifications">SMS Notifications</Label>
									</div>
									<Switch id="smsNotifications" bind:checked={notifications.smsNotifications} />
								</div>
							</div>
						</div>

						<div class="space-y-4">
							<h3 class="text-lg font-medium">Notification Types</h3>
							<div class="space-y-4">
								{#each Object.entries( { newJobs: 'New Job Requests', jobUpdates: 'Job Status Updates', driverUpdates: 'Driver Status Changes', systemAlerts: 'System Alerts' } ) as [key, label]}
									<div class="flex items-center justify-between">
										<Label for={key}>{label}</Label>
										<Switch
											id={key}
											bind:checked={notifications[key as keyof typeof notifications]}
										/>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onclick={handleNotificationUpdate}>Save Preferences</Button>
				</CardFooter>
			</Card>
		</TabsContent>

		<!-- Access Control -->
		<TabsContent value="access">
			<Card>
				<CardHeader>
					<CardTitle>Access Control</CardTitle>
					<CardDescription>Manage user roles and permissions</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-6">
						<div class="flex items-center space-x-2">
							<Shield class="h-4 w-4 text-muted-foreground" />
							<h3 class="text-lg font-medium">User Roles</h3>
						</div>
						<div class="space-y-4">
							{#each roles as role}
								<div class="flex items-center justify-between rounded-lg border p-4">
									<div>
										<h4 class="font-medium">{role.name}</h4>
										<p class="text-sm text-muted-foreground">{role.description}</p>
									</div>
									<Button variant="outline">Edit Permissions</Button>
								</div>
							{/each}
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button>
						<Users class="mr-2 h-4 w-4" />
						Add New Role
					</Button>
				</CardFooter>
			</Card>
		</TabsContent>
		<TabsContent value="onboarding">
			<Card>
				<CardHeader>
					<CardTitle>Onboarding & Help</CardTitle>
					<CardDescription>Manage onboarding preferences and access help resources</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="space-y-6">
						<!-- Onboarding Guide -->
						<div class="space-y-4">
							<div class="flex items-center justify-between border-b pb-4">
								<div class="space-y-0.5">
									<h3 class="text-lg font-medium">Welcome Guide</h3>
									<p class="text-muted-foreground">
										Take a tour of QuickFleet's features and learn how to use the platform
										effectively
									</p>
								</div>
								<a href="/onboarding">
									<Button>
										<Compass class="mr-2 h-4 w-4" />
										Start Guide
									</Button>
								</a>
							</div>

							<!-- New User Settings -->
							<div class="space-y-4">
								<h3 class="text-lg font-medium">New User Preferences</h3>
								<div class="space-y-4">
									<div class="flex items-center justify-between">
										<div class="space-y-0.5">
											<Label>Show Welcome Guide for New Users</Label>
											<p class="text-sm text-muted-foreground">
												Automatically show the onboarding guide to new team members
											</p>
										</div>
										<Switch bind:checked={notifications.showNewUserGuide} />
									</div>
									<div class="flex items-center justify-between">
										<div class="space-y-0.5">
											<Label>Feature Tips</Label>
											<p class="text-sm text-muted-foreground">
												Show helpful tips and suggestions while using the platform
											</p>
										</div>
										<Switch bind:checked={notifications.showFeatureTips} />
									</div>
								</div>
							</div>

							<!-- Help Resources -->
							<div class="space-y-4">
								<h3 class="text-lg font-medium">Help Resources</h3>
								<div class="grid gap-4 md:grid-cols-2">
									<Card>
										<CardHeader>
											<CardTitle class="text-base">Documentation</CardTitle>
										</CardHeader>
										<CardContent>
											<p class="text-sm text-muted-foreground">
												Access detailed guides and documentation for all features
											</p>
										</CardContent>
										<CardFooter>
											<Button variant="outline" class="w-full">
												<FileText class="mr-2 h-4 w-4" />
												View Docs
											</Button>
										</CardFooter>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle class="text-base">Video Tutorials</CardTitle>
										</CardHeader>
										<CardContent>
											<p class="text-sm text-muted-foreground">
												Watch step-by-step tutorials on using QuickFleet
											</p>
										</CardContent>
										<CardFooter>
											<Button variant="outline" class="w-full">
												<Video class="mr-2 h-4 w-4" />
												Watch Tutorials
											</Button>
										</CardFooter>
									</Card>
								</div>
							</div>

							<!-- Support Contact -->
							<div class="mt-6 rounded-lg border p-4">
								<div class="flex items-start space-x-4">
									<HelpCircle class="mt-1 h-6 w-6 text-primary" />
									<div>
										<h4 class="font-medium">Need Additional Help?</h4>
										<p class="mt-1 text-sm text-muted-foreground">
											Our support team is available 24/7 to assist you with any questions or issues.
										</p>
										<Button variant="link" class="mt-2 px-0">
											<Mail class="mr-2 h-4 w-4" />
											Contact Support
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>
</div>
