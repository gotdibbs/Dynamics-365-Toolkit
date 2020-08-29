Feature: Info Panel Loads

  Scenario Outline: In Dynamics 365, extension has loaded, info pane displays correct data

    Given I am on the info pane
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | test     | test                 | test                           |
