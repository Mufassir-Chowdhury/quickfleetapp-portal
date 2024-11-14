<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.css';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	let { children } = $props();

	let pageUrl = $derived($page.url.pathname);
</script>

{#if pageUrl !== '/login'}
	<Navigation />
{/if}
{@render children()}
{#if pageUrl !== '/login'}
	<Footer />
{/if}
<CookieConsent />
