<!-- src/lib/components/messaging/ChatDialog.svelte -->
<script lang="ts">
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { format } from 'date-fns';
	import { Send } from 'lucide-svelte';
	import type { Message } from '$lib/types';

	let {
		driverId,
		driverName,
		open = $bindable(false)
	} = $props<{
		jobId: string;
		driverId: string;
		driverName: string;
		open: boolean;
	}>();

	let messages: Message[] = $state([
		{
			id: 'msg1',
			senderId: 'op1',
			senderName: 'Operator',
			content: "Hi, please confirm when you're on your way",
			timestamp: new Date(Date.now() - 3600000).toISOString(),
			isOperator: true
		},
		{
			id: 'msg2',
			senderId: driverId,
			senderName: driverName,
			content: "I'll be there in 10 minutes",
			timestamp: new Date(Date.now() - 1800000).toISOString(),
			isOperator: false
		}
	]);

	let newMessage = $state('');
	let scrollArea: HTMLDivElement;

	function handleClose() {
		open = false;
	}

	async function handleSend(e: { preventDefault: () => void }) {
		e.preventDefault();
		if (!newMessage.trim()) return;

		const message: Message = {
			id: `msg${messages.length + 1}`,
			senderId: 'op1',
			senderName: 'Operator',
			content: newMessage,
			timestamp: new Date().toISOString(),
			isOperator: true
		};

		messages = [...messages, message];
		newMessage = '';

		// In real app, send message to PocketBase
		// await pb.collection('messages').create(message);

		// Scroll to bottom after message is sent
		setTimeout(() => {
			if (scrollArea) {
				scrollArea.scrollTop = scrollArea.scrollHeight;
			}
		}, 0);
	}

	function formatMessageTime(timestamp: string): string {
		return format(new Date(timestamp), 'HH:mm');
	}
</script>

<Dialog {open} on:close={handleClose}>
	<DialogContent class="sm:max-w-[425px]">
		<DialogHeader>
			<DialogTitle>Chat with {driverName}</DialogTitle>
		</DialogHeader>

		<div class="flex h-[60vh] flex-col">
			<ScrollArea class="flex-1 p-4">
				<div class="space-y-4" bind:this={scrollArea}>
					{#each messages as message}
						<div class="flex flex-col {message.isOperator ? 'items-end' : 'items-start'}">
							<div
								class="max-w-[80%] rounded-lg p-3 {message.isOperator
									? 'bg-primary text-primary-foreground'
									: 'bg-muted'}"
							>
								<p class="text-sm">{message.content}</p>
							</div>
							<span class="mt-1 text-xs text-muted-foreground">
								{formatMessageTime(message.timestamp)}
							</span>
						</div>
					{/each}
				</div>
			</ScrollArea>

			<div class="border-t p-4">
				<form class="flex gap-2" onsubmit={handleSend}>
					<Input type="text" placeholder="Type your message..." bind:value={newMessage} />
					<Button type="submit" size="icon">
						<Send class="h-4 w-4" />
					</Button>
				</form>
			</div>
		</div>
	</DialogContent>
</Dialog>
