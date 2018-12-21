@citi @CH-272
Feature: Open house filter should clean results when deselecting it

Scenario:
Given I access to CitiHabitats Home page
When I go to sales
And I filter by open houses in all days
Then I only see open house results
When I deselect the open house filter
Then the open house filter is no longer applied