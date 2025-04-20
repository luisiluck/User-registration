Feature: US-002	User Verification
As a Registered User
I want to verify my email
so that My account is fully activated

Scenario: SC-010 Update user as verified
Given a user with email "user2@mail.co" exists in database
When a "GET" request is sent to "/verify" with...
  """
  { "query": {"t": "testT0k3n"}}
  """
Then a 200 response should be received with...
  """
  { "message": "User verified successfully"}
  """
And a user with email "user2@mail.co" should exist in database with...
  """
  {"verified": true}
  """
And a "user.verified" event should be produced with...
  """
  {"email": "user2@mail.co"}
  """

Scenario Outline: SC-011 Trying user verification with invalid token
When a "GET" request is sent to "/verify" with...
  """
  {"query":<token>}
  """
Then a <status> response should be received with...
  """
  { "error": "unknown"}
  """
Examples:
  | token                  | status |
  | {"t": "invalid token"} | 404    |
  | {"t": true}            | 404    |
  | {}                     | 400    |