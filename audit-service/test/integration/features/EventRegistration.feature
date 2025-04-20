Feature: US-003	Perform Audit
  As an Auditor
  I want to record user interactions
  so that check them later

  Scenario: SC-006	Event is recorded succesfully
    Given the Audit service is running
    When the "<event>" event is consumed with...
      """
      <payload>
      """
    Then the "<event>" type should be stored with...
      """
      <payload>
      """

    Examples:
      | event                  | payload                                    |
      | user.registered        | {"email": "abc@def.gh", "verified": false} |
      | user.verified          | {"email": "abc@def.gh", "verified": true}  |
      | verification.requested | {"email": "abc@def.gh", "verified": false} |
