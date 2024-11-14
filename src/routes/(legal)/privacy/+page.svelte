<!-- src/routes/privacy/+page.svelte -->
<script lang="ts">
	import LegalLayout from '$lib/components/LegalLayout.svelte';
</script>

<LegalLayout
	title="Privacy Policy"
	description="This Privacy Policy describes how we collect, use, and handle your personal information."
	lastUpdated="November 14, 2024"
>
	<h2 class="mb-2 mt-6 text-2xl">1. Introduction</h2>
	<p>
		At QuickFleet, we take your privacy seriously. This Privacy Policy explains how we collect, use,
		disclose, and safeguard your information when you use our taxi dispatch platform.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">2. Information We Collect</h2>
	<h3 class="my-2 text-xl">2.1 Personal Information</h3>
	<p>We collect information that you provide directly to us, including:</p>
	<ul>
		<li>• Name and contact information</li>
		<li>• Login credentials</li>
		<li>• Payment information</li>
		<li>• Vehicle information (for drivers)</li>
		<li>• Location data</li>
		<li>• Communication preferences</li>
	</ul>

	<h3 class="my-2 text-xl">2.2 Usage Information</h3>
	<p>We automatically collect certain information when you use our service, including:</p>
	<ul>
		<li>• Device information</li>
		<li>• IP address</li>
		<li>• Browser type</li>
		<li>• Usage patterns</li>
		<li>• Access times</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">3. How We Use Your Information</h2>
	<p>We use the collected information for various purposes, including:</p>
	<ul>
		<li>• Providing and maintaining our services</li>
		<li>• Processing and completing transactions</li>
		<li>• Sending administrative information</li>
		<li>• Improving our services</li>
		<li>• Ensuring platform security</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">4. Data Sharing and Disclosure</h2>
	<p>We may share your information with:</p>
	<ul>
		<li>• Service providers and business partners</li>
		<li>• Regulatory authorities</li>
		<li>• Other users (limited information for service delivery)</li>
		<li>• Third parties with your consent</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">5. Data Security</h2>
	<p>
		We implement appropriate technical and organizational measures to protect your personal
		information against unauthorized access, alteration, disclosure, or destruction.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">6. Your Rights and Choices</h2>
	<p>You have the right to:</p>
	<ul>
		<li>• Access your personal information</li>
		<li>• Correct inaccurate data</li>
		<li>• Request deletion of your data</li>
		<li>• Object to data processing</li>
		<li>• Data portability</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">7. International Data Transfers</h2>
	<p>
		Your information may be transferred to and processed in countries other than your country of
		residence. We ensure appropriate safeguards are in place for such transfers.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">8. Children's Privacy</h2>
	<p>
		Our services are not intended for use by children under 18. We do not knowingly collect
		information from children under 18.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">9. Changes to This Policy</h2>
	<p>
		We may update this Privacy Policy from time to time. We will notify you of any material changes
		by posting the updated policy on our platform.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">10. Contact Us</h2>
	<p>
		If you have questions about this Privacy Policy, please contact us at:
		<br />
		Email: privacy@quickfleet.com
		<br />
		Data Protection Officer: [Name]
		<br />
		Address: [Your Company Address]
	</p>
</LegalLayout>
