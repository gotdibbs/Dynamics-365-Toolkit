Feature: Info Pane

  Scenario Outline: Info pane displays application data

    Given I am on the info pane
    Then I should see a value displayed for <field>

    Examples:
      | field               |
      | dynamics-version    |
      | org-name            |
      | app-name            |
      | user-name           |
      | user-id             |
      | security-roles      |

  Scenario Outline: Info pane does not display record data when not viewing a record

    Given I am on the info pane
    Then I should not see a value displayed for <field>

    Examples:
      | field               |
      | record-id           |
      | record-url          |
      | logical-name        |

  Scenario Outline: Info pane displays record data when viewing a record

    Given I am viewing a record
    When I am on the info pane
    Then I should see a value displayed for <field>

    Examples:
      | field               |
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

    Given I am viewing a record
    When I am on the info pane
    Then I should see <field> display the correct value

    Examples:
      | field               |
      | record-id           |
      | logical-name        |

  Scenario Outline: Links render and direct to the correct entity

    Given I am on the info pane
    Then I should see <field> display a link to <entity>

    Examples:
      | field               | entity        |
      | user-name           | systemuser    |
      | security-roles      | roles         |

  Scenario: Copies displayed value

    Given I am on the info pane
    When I click on the copy button
    Then I should have copied the correct value