Feature: Quick Actions

  Background: Starting from the info pane on a record

    Given I am on the info pane
    And I am viewing a record

  Scenario: Toggle Schema Names

    When I invoke the toggle-schema-names action
    Then I see the schema names for fields on the form

  Scenario: Unlock All Fields

    When I disable a field
    And I invoke the enable-all-fields action
    Then The field I disabled is reenabled

  Scenario: Show All Fields

    When I hide a field
    And I invoke the show-all-fields action
    Then The field I hid should now be visible

  Scenario: Enable Command Checker

    When I invoke the open-ribbon-debugger action
    Then I see the command checker

  Scenario: Get Support

    When I invoke the get-support action
    Then A new window should open with "Issues" in the title