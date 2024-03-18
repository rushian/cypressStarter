Feature: Buy tickets
    As a passenger, I choose the origin and destination of a flight 

  Scenario: Successful purchase
    Given I am on the home page
    When I choose departure and destination
    And I click the "Find Flights" button
    Then I should be redirected to choose a flight


