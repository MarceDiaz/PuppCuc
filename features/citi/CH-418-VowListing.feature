@citi @CH-418
Feature: When an unauthenticated user clicks on a vow listing they should see a limited amount of information on the page.

Scenario:
Given I access to CitiHabitats Home page
And I am not signed in
When I go to sales
And Navigate to a page with Locks
And Click a VOW listing
Then I see the listing page with limited information