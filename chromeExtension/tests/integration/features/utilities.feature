Feature: Utilities Pane

  Background: Starting from the utilities pane

    Given I am on the utilities pane

  Scenario: Copy Record Id

    When I am viewing a record
    And I invoke the copy-record-id action
    Then I should have copied the record id to my clipboard

  Scenario: Copy Record Link

    When I am viewing a record
    And I invoke the copy-record-link action
    Then I should have copied the record url to my clipboard

  Scenario: Unlock All Fields

    When I am viewing a record
    And I disable a field
    And I invoke the enable-all-fields action
    Then The field I disabled is reenabled

  Scenario: Focus Field

    When I am viewing a record
    And I invoke the focus-field action
    Then The field specified should have received focus

  Scenario: Enable Command Checker

    When I invoke the open-ribbon-debugger action
    Then I see the command checker

  Scenario: Populate Required Fields

    When I am viewing a new record
    And I invoke the populate-required-fields action
    Then All required fields are populated

  Scenario: Show All Fields

    When I am viewing a record
    And I hide a field
    And I invoke the show-all-fields action
    Then The field I hid should now be visible

  Scenario: Show Dirty Fields

    When I am viewing a record
    And I change a field value
    And I invoke the show-dirty-fields action
    Then I see an alert with the field I changed listed

  Scenario: Show Entity Data

    When I am viewing a record
    And I invoke the show-entity-data action
    Then I see a modal with the entity data

  Scenario: Toggle Schema Names

    When I am viewing a record
    And I invoke the toggle-schema-names action
    Then I see the schema names for fields on the form