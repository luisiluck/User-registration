# Integration Scenarios

This section explains the behavior of each service as an independent and self-contained piece of functionality. As a result, the integration testing approach will treat each deployable artifact as a system under test (SUT).

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
<td>SC-007</td>
<td colspan="2">New User creation</td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a user with email "user@mail.co" does not exist in database<br /><strong>When</strong> a "POST" request is sent to "/register" with...<br />&nbsp; """<br /><span>&nbsp; {</span><span> </span><span>"email"</span><span>:</span><span> </span><span>"user@mail.co"</span><span>,</span><span> </span><span>"name"</span><span>:</span><span> </span><span>"name"</span><span>,</span><span> </span><span>"password"</span><span>:</span><span> </span><span>"Abcd123!"</span><span>}</span><br />&nbsp; """<br /><strong>Then</strong> a "201" response should be received with...<br />&nbsp; """<br /><span>&nbsp; {</span><span>&nbsp;</span><span>"message"</span><span>:</span><span> </span><span>"User registered successfully"</span><span>}</span><br />&nbsp; """<br /><strong>And&nbsp;</strong>a user with email "user@mail.co" should exist in database with...<br />&nbsp; """<br />&nbsp; {verified: false}<br />&nbsp; """<br /><strong>And</strong> a "user.registered" event should be produced</td>
</tr>
<tr>
<td>SC-008</td>
<td colspan="2">Trying of User creation with missed fields</td>
</tr>
<tr>
<td colspan="3"><strong>When</strong> a "POST" request is sent to "/register" with...<br />&nbsp; """<br /><span>&nbsp; &lt;example&gt;</span><br />&nbsp; """<br /><strong>Then</strong> a "400" response should be received with...<br />&nbsp; """<br /><span>&nbsp; {</span><span>&nbsp;</span><span>"message"</span><span>:</span><span> </span><span>"unknown"</span><span>}</span><br />&nbsp; """<br /><strong>Examples:<br />&nbsp;&nbsp;</strong>| example<br />&nbsp; | <span>{</span><span> </span><span>"email"</span><span>:</span><span> </span><span>"user@mail.co"</span><span>}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|<br />&nbsp; | { "email": "user@mail.co", "password": "Abcd123!"} |<br />&nbsp; | {}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |</span></td>
</tr>
<tr>
<td>SC-009</td>
<td colspan="2">Trying of User creation with existent email</td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a user with email "user@mail.co" exists in database<br /><strong>When</strong> a "POST" request is sent to "/register" with...<br />&nbsp; """<br /><span>&nbsp; {</span><span> </span><span>"email"</span><span>:</span><span> </span><span>"user@mail.co"</span><span>,</span><span> </span><span>"name"</span><span>:</span><span> </span><span>"name"</span><span>,</span><span> </span><span>"password"</span><span>:</span><span> </span><span>"Abcd123!"</span><span>}</span><br />&nbsp; """<br /><strong>Then</strong> a "409" response should be received with...<br />&nbsp; """<br /><span>&nbsp; {</span><span>&nbsp;</span><span>"message"</span><span>:</span><span> </span><span>"unknown"</span><span>}</span><br />&nbsp; """</td>
</tr>
<tr>
<td>SC-012</td>
<td colspan="2">Send verification email</td>
</tr>
<tr>
<td colspan="3"><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code"><strong>Given</strong> the Email service is listening user.registered topic</span><br data-prosemirror-content-type="node" data-prosemirror-node-name="hardBreak" data-prosemirror-node-inline="true" /><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code"><strong>When</strong> the user.registered event is consumed with...</span><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code">&nbsp; <br />&nbsp; """</span><br data-prosemirror-content-type="node" data-prosemirror-node-name="hardBreak" data-prosemirror-node-inline="true" /><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code">&nbsp; { "email": "a@b.cd", "verified": "&lt;verified&gt;"}</span><br data-prosemirror-content-type="node" data-prosemirror-node-name="hardBreak" data-prosemirror-node-inline="true" /><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code">&nbsp; """</span><br data-prosemirror-content-type="node" data-prosemirror-node-name="hardBreak" data-prosemirror-node-inline="true" /><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code">Then the verification email to "a@b.cd" &lt;should&gt; be sent<br /></span>Examples:<br data-prosemirror-content-type="node" data-prosemirror-node-name="hardBreak" data-prosemirror-node-inline="true" /><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code">| verified | should&nbsp; &nbsp; &nbsp; &nbsp; |<br /></span><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code">| false&nbsp; &nbsp; &nbsp;| should&nbsp; &nbsp; &nbsp; &nbsp; |<br /></span><span class="code" data-prosemirror-content-type="mark" data-prosemirror-mark-name="code">| true&nbsp; &nbsp; &nbsp; &nbsp;| should not |</span></td>
</tr>
</tbody>
</table>
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
<td>SC-010</td>
<td colspan="2">Update user as verified</td>
</tr>
<tr>
<td colspan="3"><strong>Given</strong> a user with email "user@mail.co" exists in database<br /><strong>When</strong> a "GET" request is sent to "/verify" with...<br />&nbsp; """<br /><span>&nbsp; {</span><span> </span><span>"t"</span><span>:</span><span> </span><span>"&lt;token&gt;"</span><span>}</span><br />&nbsp; """<br /><strong>Then</strong> a "200" response should be received with...<br />&nbsp; """<br /><span>&nbsp; {</span><span>&nbsp;</span><span>"message"</span><span>:</span><span> </span><span>"User verified successfully"</span><span>}</span><br />&nbsp; """<br /><strong>And&nbsp;</strong>a user with email "user@mail.co" should exist in database with...<br />&nbsp; """<br />&nbsp; {verified: true}<br />&nbsp; """<br /><strong>And</strong> a "user.verifed" event should be produced</td>
</tr>
<tr>
<td>SC-011</td>
<td colspan="2">Trying user verification with invalid token</td>
</tr>
<tr>
<td colspan="3"><strong>When</strong> a "GET" request is sent to "/verify" with...<br />&nbsp; """<br /><span>&nbsp; {</span><span> </span><span>"t"</span><span>:</span><span> </span><span>"&lt;invalid-token&gt;"</span><span>}</span><br />&nbsp; """<br /><strong>Then</strong> a "404" response should be received with...<br />&nbsp; """<br /><span>&nbsp; {</span><span>&nbsp;</span><span>"error"</span><span>:</span><span> </span><span>"Unknown"</span><span>}</span><br />&nbsp; """</td>
</tr>
</tbody>
</table>