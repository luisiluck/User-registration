Feature: US-001	User Registration
As a Not-Registered User
I want to register for the service
so that I can access its features

  Scenario: SC-001 not registered user can register with valid data
    Given a not-registered user
    When Registration data is provided
    Then the response message should indicate successful "registration"
    And a verfication email should be received
    And the "user.registered" event should be logged
    And the "verification.requested" event should be logged
