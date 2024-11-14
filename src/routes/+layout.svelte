<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.css';
	import { page } from '$app/stores';
	let { children } = $props();

	let pageUrl = $derived($page.url.pathname);
</script>

{#if pageUrl !== '/login'}
	<Navigation />
{/if}
{@render children()}
