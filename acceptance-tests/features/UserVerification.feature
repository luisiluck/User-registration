Feature: US-002 User Verification
As a Registered User
I want to verify my email
so that My account is fully activated

  Scenario: SC-004 user can verify email
    Given a registered user
    And a received verification email
    When the verification is accepted
    Then the response message should indicate successful "verification"
    And the "user.verified" event should be logged
