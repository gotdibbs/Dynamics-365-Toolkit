Feature: Info Pane

  Background: Starting from the info pane

    Given I am on the info pane

  Scenario: Info pane displays application data

    Then I should see a value for these fields
      | dynamics-version    |
      | org-name            |
      | app-name            |
      | user-name           |
      | user-id             |
      | security-roles      |

  Scenario: Info pane does not display record data when not viewing a record

    Then I should NOT see a value for these fields
      | record-id           |
      | record-url          |
      | logical-name        |

  Scenario: Info pane displays record data when viewing a record

    When I am viewing a record
    Then I should see a value for these fields
      | dynamics-version    |
      | org-name            |
      | app-name            |
      | user-name           |
      | user-id             |
      | security-roles      |
      | record-id           |
      | record-url          |
      | logical-name        |

  Scenario Outline: Info Pane displays correct data when viewing a record

    When I am viewing a record
    Then I should see each field display the correct value
      | record-id           |
      | logical-name        |

  Scenario Outline: Links render and direct to the correct entity

    Then I should see each field display a link to the correct entity
      | field               | entity        |
      | user-name           | systemuser    |
      | security-roles      | roles         |

  Scenario: Copies displayed value

    When I click on the copy button
    Then I should have copied the correct value