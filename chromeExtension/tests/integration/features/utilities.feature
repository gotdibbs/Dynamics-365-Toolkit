Feature: Utilities Pane

#   Scenario: Copy Record Id

#     Given I am on the utilities pane and viewing a record
#     When I invoke the copy-record-id action
#     Then I should have copied the record id to my clipboard

#   Scenario: Copy Record Link

#     Given I am on the utilities pane and viewing a record
#     When I invoke the copy-record-link action
#     Then I should have copied the record url to my clipboard

#   Scenario: Unlock All Fields

#     Given I am on the utilities pane and viewing a record
#     When I disable a field, then invoke the enable-all-fields action
#     Then The field I disabled is reenabled

#   Scenario: Focus Field

#     Given I am on the utilities pane and viewing a record
#     When I invoke the focus-field action
#     Then The field specified should have received focus

#   Scenario: Enable Command Checker

#     Given I am on the utilities pane and viewing a record
#     When I invoke the open-ribbon-debugger action
#     Then I see the command checker

  Scenario: Populate Required Fields

    Given I am on the utilities pane and viewing a new record
    When I invoke the populate-required-fields action
    Then All required fields are populated

  Scenario: Show All Fields

    Given I am on the utilities pane and viewing a record
    When I hide a field, then invoke the show-all-fields action
    Then The field I hid should now be visible

  Scenario: Show Dirty Fields

    Given I am on the utilities pane and viewing a record
    When I change a field value, then invoke the show-dirty-fields action
    Then I see an alert with the field I changed listed

  Scenario: Toggle Schema Names

    Given I am on the utilities pane and viewing a record
    When I invoke the toggle-schema-names action
    Then I see the schema names for fields on the form