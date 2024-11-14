<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
	import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();

	const footerLinks = {
		company: [
			{ label: 'About Us', href: '/about' },
			{ label: 'Contact', href: '/contact' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'Press', href: '/press' }
		],
		legal: [
			{ label: 'Terms of Service', href: '/terms' },
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'Cookie Policy', href: '/cookies' },
			{ label: 'GDPR', href: '/gdpr' }
		],
		support: [
			{ label: 'Help Center', href: '/help' },
			{ label: 'Driver Support', href: '/driver-support' },
			{ label: 'Safety', href: '/safety' },
			{ label: 'FAQs', href: '/faqs' }
		]
	};

	const socialLinks = [
		{ icon: Facebook, href: '#', label: 'Facebook' },
		{ icon: Twitter, href: '#', label: 'Twitter' },
		{ icon: Instagram, href: '#', label: 'Instagram' }
	];
</script>

<footer class="border-t bg-background">
	<div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
		<!-- Main Footer Content -->
		<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Brand Column -->
			<div class="space-y-4">
				<div class="flex items-center space-x-2">
					<!-- You can replace this with your logo -->
					<span class="text-2xl font-bold">QuickFleet</span>
				</div>
				<p class="text-sm text-muted-foreground">
					Streamlining taxi operations with efficient dispatch solutions.
				</p>
				<div class="flex space-x-4">
					{#each socialLinks as { icon: Icon, href, label }}
						<a {href} class="text-muted-foreground hover:text-primary" aria-label={label}>
							<Icon class="h-5 w-5" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Company Links -->
			<div>
				<h3 class="text-sm font-semibold">Company</h3>
				<ul class="mt-4 space-y-2">
					{#each footerLinks.company as { label, href }}
						<li>
							<a {href} class="text-sm text-muted-foreground hover:text-primary">{label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Legal Links -->
			<div>
				<h3 class="text-sm font-semibold">Legal</h3>
				<ul class="mt-4 space-y-2">
					{#each footerLinks.legal as { label, href }}
						<li>
							<a {href} class="text-sm text-muted-foreground hover:text-primary">{label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div>
				<h3 class="text-sm font-semibold">Support</h3>
				<ul class="mt-4 space-y-2">
					{#each footerLinks.support as { label, href }}
						<li>
							<a {href} class="text-sm text-muted-foreground hover:text-primary">{label}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="border-t">
		<div class="mx-auto max-w-7xl px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
			<div class="flex items-center justify-center space-x-4 md:order-2">
				<a
					href="tel:+441234567890"
					class="flex items-center text-sm text-muted-foreground hover:text-primary"
				>
					<Phone class="mr-2 h-4 w-4" />
					+44 123 456 7890
				</a>
				<a
					href="mailto:support@quickfleet.com"
					class="flex items-center text-sm text-muted-foreground hover:text-primary"
				>
					<Mail class="mr-2 h-4 w-4" />
					support@quickfleet.com
				</a>
			</div>
			<div class="mt-4 text-center text-sm text-muted-foreground md:order-1 md:mt-0">
				&copy; {currentYear} QuickFleet. All rights reserved.
				<span class="ml-1"
					>Made with ❤️ by <a
						href="https://shipitdigital.com"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-primary hover:underline">Ship it Digital</a
					></span
				>
			</div>
		</div>
	</div>
</footer>
