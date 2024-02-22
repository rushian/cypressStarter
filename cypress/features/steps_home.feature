Feature: Comprar passagens

  Scenario: Compra com sucesso
    Given I am on the home page
    When I choose departure and destination
    And I click the "Find Flights" button
    Then I should be redirected to choose a flight
    
