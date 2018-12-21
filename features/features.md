# Features

A Feature can be defined as a standalone unit or functionality of a project that can be tested.

Each feature has its own file and its located in a project's folder inside the features folder.

```
\---features
    +---citi
    |       CH-123-Login.feature
    |
    \---newTaxi
            NT-1052-BasicNavigation.feature
            NT-1056-ListOfFeaturesOnSearch.feature
```
### Naming 
The feature should match to a Jira X-Ray test case card and it's file name should be the Jira card ID and a brief description. For example: `CH-123-Login.feature`

### Sintax
Features are written using Gherkin syntax. Checkout the oficial documention from
[Cucumber](https://docs.cucumber.io/gherkin/reference/)
