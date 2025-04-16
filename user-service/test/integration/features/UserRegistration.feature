Feature: US-001	User Registration

  As a Not-Registered User
  I want to register for the service
  so that I can access its features

  Scenario: SC-007	New User creation
    Given a user with email "user@mail.co" does not exist in database
    When a "POST" request is sent to "/register" with...
      """
      {"body":{
        "email": "user@mail.co",
        "name": "name",
        "password": "Abcd123!"}}
      """
    Then a 201 response should be received with...
      """
      {"message": "User registered successfully"}
      """
    And a user with email "user@mail.co" should exist in database with...
      """
      {"verified": false}
      """
    And a "user.registered" event should be produced with...
      """
      {"email": "user@mail.co",
        "verified": false}
      """

  Scenario Outline: SC-008	Trying of User creation with missed fields
    When a "POST" request is sent to "/register" with...
      """
      {"body":<example>}
      """
    Then a 400 response should be received with...
      """
      {"error": "Missing required fields"}
      """
    Examples:
      | example                                            |
      | { "email": "user@mail.co"}                         |
      | { "email": "user@mail.co", "password": "Abcd123!"} |
      | {}                                                 |

  Scenario: SC-009	Trying of User creation with existent email
    Given a user with email "user@mail.co" exists in database
    When a "POST" request is sent to "/register" with...
      """
      {"body":{
        "email": "user@mail.co",
        "name": "name",
        "password": "Abcd123!"}}
      """
    Then a 409 response should be received with...
      """
      { "error": "User already exists" }
      """