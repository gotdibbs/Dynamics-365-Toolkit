Feature: Utilities Pane

  Scenario: Copy Record Id

    Given I am on the utilities pane and viewing a record
    When I invoke the copy-record-id action
    Then I should have copied the record id to my clipboard

  Scenario: Copy Record Link

    Given I am on the utilities pane and viewing a record
    When I invoke the copy-record-link action
    Then I should have copied the record url to my clipboard