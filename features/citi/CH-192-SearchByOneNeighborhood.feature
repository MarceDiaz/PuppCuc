@citi @CH-192
Feature: When I filter by one neighborhood, I should only see results from that neighborhood

Scenario Outline:
Given I access to CitiHabitats Home page
When I go to sales
And I filter by borough <borough> and neighborhood <neighborhood>
Then I only see listings from <neighborhood>

Examples:
|borough   | neighborhood |
|Manhattan | Flatiron     |
|Brooklyn  | Brooklyn     |