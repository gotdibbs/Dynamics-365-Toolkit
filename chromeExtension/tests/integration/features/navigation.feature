Feature: Navigation Pane

  Scenario: Advanced Find
    Given I am on the navigation pane
    When I click on the advanced-find link
    Then A new window should open with "Advanced Find" in the title

  Scenario: Import Solution
    Given I am on the navigation pane
    When I click on the import-solution link
    Then A new window should open with "Import Solution" in the title

  Scenario: Open Record List
    Given I am on the navigation pane
    When I invoke the open-record-list action
    Then A new window should open to show the record list

  Scenario: Open Record
    Given I am on the navigation pane
    When I invoke the open-record action
    Then A new window should open to show the record editor

  Scenario: Open Solution
    Given I am on the navigation pane
    When I invoke the open-solution action
    Then A new window should open with "Solution:" in the title

  Scenario: Plugin Trace Logs
    Given I am on the navigation pane
    When I click on the plugin-trace-logs link
    Then A new window should open with "Plug-in Trace Logs" in the title

  Scenario: Plugin Trace Logs
    Given I am on the navigation pane
    When I click on the show-environment-variables link
    Then A new window should open with "Environment Variable Definition" in the title

  Scenario: Solution History
    Given I am on the navigation pane
    When I click on the solution-history link
    Then A new window should open with "Solutions History" in the title