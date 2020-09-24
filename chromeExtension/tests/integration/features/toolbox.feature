Feature: Toolbox

  Background: The pane I'm viewing doesn't matter

    Given I am on the default pane

  Scenario: Toolbox is able to be closed

    When I click on the close button
    Then The toolbox display state should be closed

  Scenario: Toolbox loads, displaying the correct version

    Then I should see the correct version number

  Scenario: Toolbox is able to be collapsed

    When I click on the toggle button
    Then The toolbox display state should be collapsed

  Scenario: Toolbox is able to be expanded

    When I click on the toggle button again
    Then The toolbox display state should be expanded

  Scenario: Toolbox is able to be dragged

    When I drag the header
    Then The toolbox should change position