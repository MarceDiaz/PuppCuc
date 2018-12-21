# Automated test with Cucumber+Puppeteer framewrok

## Steps for Setting Up Project
1. `npm install`

## Linting
1. `npm run lint` - Running Linter [If you see errors, it's mostly you haven't followed the pre-determined standard]
2. `npm run lint:w` - Running Linter with watcher (recommended for development)
3. `npm run lint-fix` - Lint & Auto-Fix [*Be Careful* It will apply (defined) eslint rules to all of the files]

## Running Test Cases

- `npm run e2e` - Run all the test cases
- `npm run e2e -- --tags "@tag [or @tag2]"` - Run the test cases with the given tags:
  - For example: `npm run e2e -- --tags @citi or @NewTaxi` - will run all the tests with at least one of those tags. It will exclude the tests that don't have at least one
  - Refer to [Tagging](features/tagging.md) for further documentation
- `npm run e2e -- --tags @citi` - To run all Citi's tests
- `npm run e2e -- --tags @NewTaxi` - To run all New Taxi's tests
- `npm run e2e -- -p parallel3` - To run the tests in parallel with up to 3 slaves
- `npm run e2e -- -p staging` - To run the tests in the staging env
  - Replace staging with the name of the desired env
  - Check [data.js](features/support/data.md) to see how to add or remove environmets
- `npm run e2e -- -p browserGUI` - To open the GUI of the browser (runs headless by default)
- `npm run e2e -- -p nocolor` - To not show colors in the console
  - **Recommended for running in the VSO**

All the previous commands can be mixed and matched. Just remember to add only one `--`

## List of executing test cases
- [Executing TCs by app](ExecutingTCs.md)

## Project structure

### features folder

- [`step_definitions`](features/step_definitions/step_definitions.md)
- [`.feature files`](features/features.md)  classified in folders by project
- [`hooks.js`](features/hooks.md) used for setting @Before @After @BeforeAll @AfterAll functions
- [`cucumber.js`] To define profiles with commonly used cucumber-js CLI options. Refer to their [documentation](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#profiles)

### helper folder

- [`PuppeteerHelper`](helper/PuppeteerHelper.md)

### pageObjects folder



## Important

* This version uses [`credentials.js`] file to perform user actions. 
  If you need it, contact with: marcelo.diaz@corcoran.com, matias.pereyra@corcoran.com or guillermo.maiolo@corcoran.com 
  
  *Where must be placed?* 
  - This file must be placed on the folder [` features/support/ `]
  
  *Structure example* 
      - The structure of document is:
      
       [` {
             [site]: {
                [user]: [password]
             }
           } `]
      
  *How to use?* 
    - In your code, you can access to data like [` credentials.newTaxi[userRole] `]
    
  # PuppCuc
