# User Stories
---
This section presents the User Registration feature from a business perspective, following an agile approach. The goal is to identify priorities and risks early on, enabling the design of relevant and traceable testing scenarios based on functional requirements. The **acceptance criteria** for each user story are written in **Gherkin** language and will serve as the starting point for **end-to-end (E2E) testing scenarios**.

>[!tip]
> - Why is a good idea split user registration feature into several stories?
> - From a design point of view an unique role (actor or persona) has not the same capabilities. This perspective will help setting each behavior within suitable roles, improving the testing analysis and design, among others.

>[!note]
> [User-Registration Project](https://trello.com/b/SJi90Rb6/user-registration)

<table class="source-tableeditor">
<tbody>
<tr>
<td>US-001</td>
<td colspan="2">User Registration</td>
</tr>
<tr>
<td colspan="3">As a <strong>Not-Registered User</strong> <br />I want to <strong>register for the service</strong> <br />so that <strong>I can access its features</strong></td>
</tr>
<tr>
<td>SC-001</td>
<td colspan="2">User is registered succesfully</td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a not-registered user<br /><strong>When</strong> Registration data is provided (e.g., username, email, password)<br /><strong>Then</strong> the response should indicate successful registration<br /><strong>And</strong> a verfication email should be received<br /><strong>And</strong> the User registered event should be logged</td>
</tr>
<tr>
<td>SC-002</td>
<td colspan="2">user tries to register with missed info (Integration)<strong><br /></strong></td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a not-registered user<br /><strong>When</strong> Registration data is provided (e.g., username, email, password)<br /><strong>Then</strong> the responded message should indicate missed info<br />Examples (use sevaral convination of missed fields)</td>
</tr>
<tr>
<td>SC-003</td>
<td colspan="2">user tries to register again (same email)</td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a registered user<br /><strong>When</strong> Registration data is provided (e.g., username, email, password)<br /><strong>Then</strong> the response should indicate already exists</td>
</tr>
</tbody>
</table>

---
---
<table class="source-tableeditor">
<tbody>
<tr>
<td>US-002</td>
<td colspan="2">User Verification</td>
</tr>
<tr>
<td colspan="3">As a <strong>Registered User</strong> <br />I want to <strong>verify my email</strong><br />so that <strong>My account is fully activated</strong></td>
</tr>
<tr>
<td>SC-004</td>
<td colspan="2">User is verified succesfully</td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a registered user<br /><strong>And</strong> a received verification email<br /><strong>When</strong> the verification is accepted<br /><strong>Then</strong> the response should indacate succesful verification<br /><strong>And </strong>the User Verifcation event should be logged<br /><br />(for integration)<br /><strong>And</strong> a user.verified.event should be triggered.<br /><strong>And</strong> the Audit Service should record the user verification.<br /><strong>And</strong> an appropriate success response (res(200)) should be returned (if applicable).</td>
</tr>
<tr>
<td>SC-005</td>
<td colspan="2">User tries to verify with invalid verification<strong><br /></strong></td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a registered user<br /><strong>And</strong> an invalid verification email<br /><strong>When</strong> the verification is accepted<br /><strong>Then</strong> the user is not verified<br /><br />(for integracion)<br /><strong>And</strong> an appropriate error response (res(400)) should be returned.</td>
</tr>
</tbody>
</table>

---
---
<table class="source-tableeditor">
<tbody>
<tr>
<td>US-003</td>
<td colspan="2">Perform Audit</td>
</tr>
<tr>
<td colspan="3">As an <strong>Auditor</strong><br />I want to <strong>record user interactions</strong><br />so that <strong>check them later</strong></td>
</tr>
<tr>
<td>SC-006</td>
<td colspan="2">Event is recorded succesfully</td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a new &lt;event&gt; is produced<br /><strong>When</strong> the &lt;event&gt; is consumed<br /><strong>Then</strong> the &lt;event&gt; type, payload and timestamp should be stored<br />event:<br />&nbsp;- user registered, <br />&nbsp;- user verified,<br />&nbsp;- user verification requested</td>
</tr>
</tbody>
</table>