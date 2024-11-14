<!-- src/lib/components/Navigation.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Home, ClipboardList, Settings, User, LogOut } from 'lucide-svelte';
	import NotificationsPopover from './notifications/NotificationsPopover.svelte';
</script>

<nav class="border-b">
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- Left side - Logo and main navigation -->
			<div class="flex items-center space-x-4">
				<a href="/" class="text-xl font-bold">QuickFleet</a>
				<div class="hidden items-center space-x-2 md:flex">
					<a href="/">
						<Button variant="ghost" class="flex items-center">
							<Home class="mr-2 h-4 w-4" />
							Dashboard
						</Button>
					</a>
					<a href="/jobs">
						<Button variant="ghost" class="flex items-center">
							<ClipboardList class="mr-2 h-4 w-4" />
							Jobs
						</Button>
					</a>
				</div>
			</div>

			<!-- Right side - User menu and settings -->
			<div class="flex items-center space-x-4">
				<!-- Notifications -->
				<NotificationsPopover />

				<!-- Settings -->
				<a href="/settings">
					<Button variant="ghost" size="icon">
						<Settings class="h-5 w-5" />
					</Button>
				</a>

				<!-- User Menu -->
				<DropdownMenu>
					<DropdownMenuTrigger asChild let:builder>
						<Button builders={[builder]} variant="ghost" size="icon">
							<User class="h-5 w-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<a href="/settings" class="flex items-center">
								<Settings class="mr-2 h-4 w-4" />
								Settings
							</a>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<a href="/login" class="flex items-center">
								<LogOut class="mr-2 h-4 w-4" />
								Logout
							</a>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	</div>
</nav>
