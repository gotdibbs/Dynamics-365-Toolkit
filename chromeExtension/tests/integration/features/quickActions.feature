Feature: Quick Actions

  Scenario: Toggle Schema Names

    Given I am on the info pane and viewing a record
    When I invoke the toggle-schema-names action
    Then I see the schema names for fields on the form

  Scenario: Unlock All Fields

    Given I am on the info pane and viewing a record
    When I disable a field, then invoke the enable-all-fields action
    Then The field I disabled is reenabled

  Scenario: Show All Fields

    Given I am on the info pane and viewing a record
    When I hide a field, then invoke the show-all-fields action
    Then The field I hid should now be visible

  Scenario: Enable Command Checker

    Given I am on the info pane and viewing a record
    When I invoke the open-ribbon-debugger action
    Then I see the command checker

  Scenario: Get Support

    Given I am on the info pane and viewing a record
    When I invoke the get-support action
    Then A new window should open with "Issues" in the title