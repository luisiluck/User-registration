Feature: US-001	User Registration

  As a Not-Registered User
  I want to register for the service
  so that I can access its features

  Scenario: SC-012	Send verification email
    Given the Email service is running
    When the "user.registered" event is consumed with...
      """
      {
        "email": "a@b.cd",
        "verified": <verified>,
        "verificationToken": "testToken"
      }
      """
    Then the verification email to "a@b.cd" should <be> sent
    And a "verification.requested" event should <be> produced with...
      """
      {
        "email": "a@b.cd"
      }
      """
    Examples:
      | verified | be     |
      | false    | be     |
      | true     | not be |