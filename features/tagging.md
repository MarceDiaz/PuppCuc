# Tagging features

In Cucumber tags allow to organise features and scenario. Each feature or scenario can be assigned with one or more tags (or none).

The tags allow to run subsets of features (posibly of subset of 1) when is not needed to run all of them.

- `npm run e2e -- --tags "@tag [or @tag2]"`

In this framework tags are used to group together all the features of the different products.
We use:

|Tag|Product|
|---|-------|
|@citi|Citihabitats|
|@NewTaxi|NewTaxi|

Tags are also use to match each feature with the number of its Jira ticket, for example:

```
@citi @CH-177
Feature: Citihabitats Login

Scenario Outline: Login on CitiHabitats
Given I access to CitiHabitats Home page
When I Sign In with a valid user: <user> and pass: <pass>
Then I am Signed in
```

The `@TODO` tag is reserved to mark unfinished or disabled tests. All the npm task are made to skip the execution of features marked with `@TODO`

For further documentation, refer to the official Cucumber documentation:
https://docs.cucumber.io/cucumber/api/#tags