@citi @CH-327
Feature: Locks consistency between Global Search and Sales & Rentals 

Scenario:
Given I access to CitiHabitats Home page
And I am not signed in
When I go to sales
And Navigate to a page with Locks
And Get the id of a locked listing
And Search the recorded id in global Search
Then I see the recorded listing with a lock in the Global Search results