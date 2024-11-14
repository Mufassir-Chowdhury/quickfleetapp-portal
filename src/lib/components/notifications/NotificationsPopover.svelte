<!-- src/lib/components/notifications/NotificationsPopover.svelte -->
<script lang="ts">
	import { Bell } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { format } from 'date-fns';
	import type { Notification, NotificationType } from '$lib/types';

	let notifications: Notification[] = [
		{
			id: 'notif1',
			type: 'job_created',
			title: 'New Job Created',
			message: 'Job #JOB123 has been created for Oxford Street pickup',
			timestamp: new Date().toISOString(),
			read: false,
			jobId: 'JOB123'
		},
		{
			id: 'notif2',
			type: 'message',
			title: 'New Message',
			message: 'Driver John Doe: "I\'m approaching the pickup location"',
			timestamp: new Date(Date.now() - 3600000).toISOString(),
			read: false,
			jobId: 'JOB122',
			driverId: 'DRV001'
		}
		// Add more sample notifications
	];

	let isOpen = false;

	function markAsRead(notificationId: string) {
		notifications = notifications.map((notification) =>
			notification.id === notificationId ? { ...notification, read: true } : notification
		);
	}

	function markAllAsRead() {
		notifications = notifications.map((notification) => ({ ...notification, read: true }));
	}

	function getNotificationIcon(type: NotificationType) {
		// You can import and use different icons based on type
		if (type === 'job_created') {
			return Bell;
		} else if (type === 'message') {
			return Bell;
		}
	}

	function formatTimestamp(timestamp: string): string {
		const date = new Date(timestamp);
		const now = new Date();
		const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

		if (diffInHours < 24) {
			return format(date, 'HH:mm');
		} else if (diffInHours < 48) {
			return 'Yesterday';
		} else {
			return format(date, 'MMM d');
		}
	}

	$: unreadCount = notifications.filter((n) => !n.read).length;
</script>

<Popover bind:open={isOpen}>
	<PopoverTrigger asChild let:builder>
		<Button variant="ghost" size="icon" class="relative" builders={[builder]}>
			<Bell class="h-5 w-5" />
			{#if unreadCount > 0}
				<Badge
					class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0"
				>
					{unreadCount}
				</Badge>
			{/if}
		</Button>
	</PopoverTrigger>
	<PopoverContent class="w-80">
		<div class="flex items-center justify-between border-b pb-2">
			<h4 class="font-semibold">Notifications</h4>
			{#if unreadCount > 0}
				<Button variant="ghost" size="sm" on:click={markAllAsRead}>Mark all as read</Button>
			{/if}
		</div>
		<ScrollArea class="h-[calc(100vh-200px)] max-h-96">
			{#if notifications.length > 0}
				<div class="space-y-2 pt-2">
					{#each notifications as notification}
						<div
							class="flex cursor-pointer items-start gap-2 rounded-lg p-2 transition-colors hover:bg-accent"
							class:bg-accent={!notification.read}
							on:click={() => markAsRead(notification.id)}
							on:keydown={(e) => e.key === 'Enter' && markAsRead(notification.id)}
							role="button"
							tabindex="0"
						>
							<div class="mt-1 flex-shrink-0">
								<svelte:component this={getNotificationIcon(notification.type)} class="h-4 w-4" />
							</div>
							<div class="flex-1 space-y-1">
								<p class="text-sm font-medium leading-none">
									{notification.title}
								</p>
								<p class="text-sm text-muted-foreground">
									{notification.message}
								</p>
								<p class="text-xs text-muted-foreground">
									{formatTimestamp(notification.timestamp)}
								</p>
							</div>
							{#if !notification.read}
								<div class="h-2 w-2 rounded-full bg-blue-600"></div>
							{/if}
						</div>
					{/each}
				</div>
			{:else}
				<div class="py-6 text-center text-muted-foreground">No notifications</div>
			{/if}
		</ScrollArea>
	</PopoverContent>
</Popover>
