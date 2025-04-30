# Automated D365 Integration Testing with Playwright
This is an exploration into using Playwright to automate some integration testing with D365 Business Central. 

[![Build Status](https://datamasonssoftware.visualstudio.com/DMEDIBC/_apis/build/status%2FSPSCommerce.mmt-d365-bc-e2e-tests?branchName=main)](https://datamasonssoftware.visualstudio.com/DMEDIBC/_build/latest?definitionId=39&branchName=main)

## Getting Started
Refer to the Playwright docs for any basics: https://playwright.dev/docs/intro. For this you just need to install all the packages using NPM and can then run the tests. Alternatively, load this into VS Code, install the Playwright extension, and you can run them right from there.

## Prerequisites

### NPM

Playwright relies on NPM packages to run, so a package manager is required. If using `npm` you can clone this repository locally and run:

```
npm install
```

Everything required will be installed and you can use the various `npx` commands provided by Playwright. See their documentation for more details.

### Visual Studio Code

Visual Studio code has a fantastic extension that will recognize that the code is a playwright project and provide helpful UI features. Search for it in vs code or download it from here: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright.


### Specifying environment variables
This playwright implementation relies on a `.env` file to define various values used within tests. You must define a .env file containing the following:

```
ENVIRONMENT_URL='https://businesscentral.dynamics.com/d33a0535-b3d9-4c64-85b0-1270cb6af232/SandboxMfg'
IS_REFRESH_COOKIES=1
AAD_USERNAME='playwright@dmsorg.onmicrosoft.com'
AAD_PASSWORD=<< FILL THIS IN >>

API_AUTH_URL='https://login.microsoftonline.com/d33a0535-b3d9-4c64-85b0-1270cb6af232/oauth2/token'
API_RESOURCE='https://api.businesscentral.dynamics.com'
API_GRANT_TYPE='client_credentials'
API_ENDPOINT='https://api.businesscentral.dynamics.com/v2.0/d33a0535-b3d9-4c64-85b0-1270cb6af232/SandboxMfg/api/sps/dmedi/v1.0'
API_CLIENT_ID=<< FILL THIS IN >>
API_CLIENT_SECRET=<< FILL THIS IN >>
```

By default this is using the `SandboxMfg` instance of BC the Builder Enablement team has, but that could be changed as needed. Once those values are defined they will be pulled into the tests by Playwright.

## Developer Guide

This content is intended to help you understand how this test framework works, and what it takes to add new tests.

### Codebase overview

Here's a summary of what the various locations in the code base represent:

#### tests/api
These are spec files that test specific areas of the API. Another way to think of it are tests organized around the entity that provides data. As the test coverage increases, these files could be oriented around specific business processes too. We use the features of Playwright to help these files only contain data and `expect()` calls (i.e., locator functions and the like are relegated to page object models). This keeps the test code cleaner and easier to read.

#### tests/models
These are typescript interfaces that provide the shape of our various return objects.

#### tests/page-object-models
These are Page Object Models (POM) built on the playwright functionality to group code specific to different aspects of the ERP together. This could be functionality related to a specific screen in the ERP (like items), or a specific part of the API. This is typically where specific API calls and locator code would exist so the tests themselves can be written at a higher level.

#### tests/web
This is where spec files for tests based on UI interactions with the ERP exist. These would normally be tests validating something in the ERP based on an API interaction.

#### auth.setup.ts
This is the single test that logs into the ERP using the UI and stores the cookies required for other UI tests.

#### base.ts
This file contains the fixture code required to inject our page object models into our tests. Essentially, if we add a page object model and want to use it in a test, then we need to update this file to provide it.

### Adding tests

#### Adding new tests to an existing spec file
This is as easy as adding the new call to `test(...)` with whatever logic makes sense.

#### Adding new API tests that require new REST calls
This type of change likley requires both new `test(...)` calls in a spec file for the actual tests, but also an update to one of the page object models that contains the actual API calls. In the event that there doesn't yet exist a POM file, then we would need to do the following:
- Create the POM class and extend the `ApiPage` class to get the base functionality. Add appropriate methods to abstract away from the scenario we need in the test.
- Update the `base.ts` file to provide a new injectable item for the POM
- Finally write the test itself by injecting the POM(s) needed
