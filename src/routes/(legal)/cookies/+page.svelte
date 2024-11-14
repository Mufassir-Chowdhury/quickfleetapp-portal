<!-- src/routes/cookies/+page.svelte -->
<script lang="ts">
	import LegalLayout from '$lib/components/LegalLayout.svelte';
</script>

<LegalLayout
	title="Cookie Policy"
	description="Learn about how we use cookies and similar technologies on our platform"
	lastUpdated="November 14, 2024"
>
	<h2 class="mb-2 mt-6 text-2xl">1. What Are Cookies?</h2>
	<p>
		Cookies are small text files that are placed on your device when you visit our website. They
		help us provide you with a better experience by remembering your preferences, analyzing how you
		use our service, and enabling certain features.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">2. Types of Cookies We Use</h2>

	<h3 class="my-2 text-xl">2.1 Essential Cookies</h3>
	<p>These cookies are necessary for the website to function properly.</p>
	<table class="w-full border-collapse border">
		<thead>
			<tr class="bg-muted">
				<th class="border p-2 text-left">Cookie Name</th>
				<th class="border p-2 text-left">Purpose</th>
				<th class="border p-2 text-left">Duration</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="border p-2">session_id</td>
				<td class="border p-2">Authentication and session management</td>
				<td class="border p-2">Session</td>
			</tr>
			<tr>
				<td class="border p-2">csrf_token</td>
				<td class="border p-2">Security (CSRF protection)</td>
				<td class="border p-2">Session</td>
			</tr>
		</tbody>
	</table>

	<h3 class="my-2 text-xl">2.2 Performance Cookies</h3>
	<p>These cookies help us understand how visitors interact with our website.</p>
	<table class="w-full border-collapse border">
		<thead>
			<tr class="bg-muted">
				<th class="border p-2 text-left">Cookie Name</th>
				<th class="border p-2 text-left">Purpose</th>
				<th class="border p-2 text-left">Duration</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="border p-2">_ga</td>
				<td class="border p-2">Google Analytics - Usage tracking</td>
				<td class="border p-2">2 years</td>
			</tr>
			<tr>
				<td class="border p-2">_gid</td>
				<td class="border p-2">Google Analytics - User distinction</td>
				<td class="border p-2">24 hours</td>
			</tr>
		</tbody>
	</table>

	<h3 class="my-2 text-xl">2.3 Functional Cookies</h3>
	<p>These cookies enable enhanced functionality and personalization.</p>
	<table class="w-full border-collapse border">
		<thead>
			<tr class="bg-muted">
				<th class="border p-2 text-left">Cookie Name</th>
				<th class="border p-2 text-left">Purpose</th>
				<th class="border p-2 text-left">Duration</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="border p-2">user_preferences</td>
				<td class="border p-2">Remember user settings</td>
				<td class="border p-2">1 year</td>
			</tr>
			<tr>
				<td class="border p-2">language</td>
				<td class="border p-2">Remember language preference</td>
				<td class="border p-2">1 year</td>
			</tr>
		</tbody>
	</table>

	<h2 class="mb-2 mt-6 text-2xl">3. Third-Party Cookies</h2>
	<p>We use some third-party services that may set their own cookies:</p>
	<ul>
		<li>• Google Analytics (analytics)</li>
		<li>• Stripe (payment processing)</li>
		<li>• Mapbox (maps and location services)</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">4. Cookie Management</h2>
	<h3 class="my-2 text-xl">4.1 Browser Settings</h3>
	<p>
		You can control cookies through your browser settings. Here's how to manage cookies in common
		browsers:
	</p>
	<ul>
		<li>
			•
			<strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
		</li>
		<li>
			•
			<strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
		</li>
		<li>
			•
			<strong>Safari:</strong> Preferences → Privacy → Cookies and website data
		</li>
		<li>
			•
			<strong>Edge:</strong> Settings → Site permissions → Cookies and site data
		</li>
	</ul>

	<h3 class="my-2 text-xl">4.2 Our Cookie Manager</h3>
	<p>You can also use our cookie preference center to manage non-essential cookies:</p>
	<button class="rounded bg-primary px-4 py-2 text-primary-foreground">
		Open Cookie Settings
	</button>

	<h2 class="mb-2 mt-6 text-2xl">5. Impact of Disabling Cookies</h2>
	<p>Please note that disabling certain cookies may impact the functionality of our service:</p>
	<ul>
		<li>
			• Essential cookies cannot be disabled as they are necessary for the website to function
		</li>
		<li>
			• Disabling performance cookies will prevent us from improving our service based on usage data
		</li>
		<li>• Disabling functional cookies may reset your preferences each time you visit</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">6. Updates to This Policy</h2>
	<p>
		We may update this Cookie Policy to reflect changes in our practices or for other operational,
		legal, or regulatory reasons. We will post the updated policy on our website and update the
		"Last Updated" date.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">7. Contact Us</h2>
	<p>If you have questions about our use of cookies, please contact us:</p>
	<ul>
		<li>• Email: privacy@quickfleet.com</li>
		<li>• Phone: [Phone Number]</li>
		<li>• Address: [Company Address]</li>
	</ul>
</LegalLayout>
