Feature: Toolbox App

  Scenario: Toolbox is able to be closed
    Given I am on the default pane
    When I click on the close button
    Then The toolbox display state should be closed

  Scenario: Toolbox loads, displaying the correct version

    Given I am on the default pane
    Then I should see the correct version number

  Scenario: Toolbox is able to be collapsed

    Given I am on the default pane
    When I click on the toggle button
    Then The toolbox display state should be collapsed

  Scenario: Toolbox is able to be expanded

    Given I am on the default pane
    When I click on the toggle button again
    Then The toolbox display state should be expanded

  Scenario: Toolbox is able to be dragged

    Given I am on the default pane
    When I drag the header
    Then The toolbox should change position