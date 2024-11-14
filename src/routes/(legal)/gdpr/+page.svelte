<!-- src/routes/gdpr/+page.svelte -->
<script lang="ts">
	import LegalLayout from '$lib/components/LegalLayout.svelte';
</script>

<LegalLayout
	title="GDPR Compliance"
	description="Information about how we comply with the General Data Protection Regulation (GDPR)"
	lastUpdated="November 14, 2024"
>
	<h2 class="mb-2 mt-6 text-2xl">1. Introduction to GDPR Compliance</h2>
	<p>
		QuickFleet is committed to protecting the personal data of our users in accordance with the
		General Data Protection Regulation (GDPR). This document outlines how we adhere to GDPR
		principles and protect your rights.
	</p>

	<h2 class="mb-2 mt-6 text-2xl">2. Data Controller Information</h2>
	<p>
		QuickFleet acts as a data controller for the personal information we collect. Our Data
		Protection Officer can be contacted at:
	</p>
	<ul>
		<li>• Email: dpo@quickfleet.com</li>
		<li>• Phone: [Phone Number]</li>
		<li>• Address: [Company Address]</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">3. Legal Basis for Processing</h2>
	<p>We process personal data under the following legal bases:</p>
	<ul>
		<li>
			• <strong>Contractual Necessity:</strong> Processing needed to fulfill our service contract
		</li>
		<li>• <strong>Legal Obligation:</strong> Processing required by UK and EU law</li>
		<li>
			• <strong>Legitimate Interests:</strong> Processing that serves our legitimate business interests
		</li>
		<li>• <strong>Consent:</strong> Processing based on your explicit consent</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">4. Your Rights Under GDPR</h2>
	<p>As a data subject, you have the following rights:</p>
	<ul>
		<li>• <strong>Right to Access:</strong> Obtain a copy of your personal data</li>
		<li>• <strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
		<li>• <strong>Right to Erasure:</strong> Request deletion of your personal data</li>
		<li>• <strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
		<li>• <strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
		<li>• <strong>Right to Object:</strong> Object to certain types of processing</li>
		<li>
			• <strong>Rights Regarding Automated Decision Making:</strong> Challenge automated decisions
		</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">5. Data Processing Activities</h2>
	<h3 class="my-2 text-xl">5.1 Location Data Processing</h3>
	<p>We process location data to:</p>
	<ul>
		<li>• Match drivers with nearby jobs</li>
		<li>• Calculate optimal routes</li>
		<li>• Track job progress</li>
		<li>• Ensure service quality</li>
	</ul>

	<h3 class="my-2 text-xl">5.2 Communication Data</h3>
	<p>We process communication data to:</p>
	<ul>
		<li>• Facilitate operator-driver communication</li>
		<li>• Send service notifications</li>
		<li>• Provide customer support</li>
		<li>• Handle disputes</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">6. Data Retention</h2>
	<p>
		We retain personal data only for as long as necessary to fulfill the purposes for which it was
		collected, including:
	</p>
	<ul>
		<li>• Active account data: Throughout the period of service use</li>
		<li>• Transaction records: 7 years (legal requirement)</li>
		<li>• Communication logs: 2 years</li>
		<li>• Location data: 6 months</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">7. International Data Transfers</h2>
	<p>When we transfer data outside the UK/EEA, we ensure appropriate safeguards through:</p>
	<ul>
		<li>• Standard Contractual Clauses</li>
		<li>• Adequacy decisions</li>
		<li>• Binding Corporate Rules</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">8. Data Security Measures</h2>
	<p>We implement appropriate technical and organizational measures including:</p>
	<ul>
		<li>• Encryption of personal data</li>
		<li>• Regular security assessments</li>
		<li>• Access controls and authentication</li>
		<li>• Staff training on data protection</li>
		<li>• Incident response procedures</li>
	</ul>

	<h2 class="mb-2 mt-6 text-2xl">9. How to Exercise Your Rights</h2>
	<p>To exercise your GDPR rights:</p>
	<ol>
		<li>• Contact our DPO at dpo@quickfleet.com</li>
		<li>• Use the Rights Request form in your account settings</li>
		<li>• Write to us at our registered address</li>
	</ol>
	<p>We will respond to your request within one month.</p>

	<h2 class="mb-2 mt-6 text-2xl">10. Complaints</h2>
	<p>If you're unhappy with how we handle your personal data, you can:</p>
	<ol>
		<li>• Contact our DPO</li>
		<li>• File a complaint with the ICO (Information Commissioner's Office)</li>
		<li>• Seek judicial remedy</li>
	</ol>
</LegalLayout>
