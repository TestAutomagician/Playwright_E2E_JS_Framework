# Playwright E2E JavaScript Framework

A JavaScript test-automation project built with [Playwright Test](https://playwright.dev/docs/test-intro). It contains browser UI tests, API test examples, reusable page objects and utilities, and a Jenkins pipeline.

## What’s included

- **UI automation** for page content and browser interactions, including dialogs, frames, windows, forms, and navigation.
- **Page Object Model examples** in `PageObjectModel/`.
- **API test examples** for the public REST API at `https://api.restful-api.dev`.
- **Database test example** using MySQL and the `mysql2` package.
- **Shared helpers and sample data** in `API/`, `utils/`, and `testData/`.
- **Playwright HTML reporting** and a Jenkins pipeline in `Jenkinsfile`.

Tests may visit external websites and APIs, so a network connection is required. Those services and their content can change independently of this project.

## Requirements

- Node.js (an active LTS release is recommended)
- npm
- Chromium installed through Playwright
- For the database example only: a reachable MySQL server with the database and test data expected by `tests/db.spec.js`

## Setup

From the repository root, install dependencies and the browser:

```bash
npm ci
npx playwright install chromium
```

If you do not have the lockfile available, use `npm install` instead of `npm ci`.

## Run tests

Run the complete Playwright suite:

```bash
Enterprise QA Automation Framework

Overview
Scalable Playwright-based automation framework designed for enterprise applications, supporting UI, API,DB and CI/CD integration.

Features
- POM architecture
- Parallel execution
- Allure reporting
- CI/CD integration (Jenkins + GitHub Actions)
- AI-based test optimization

Results
  40% faster execution  
  30% improved coverage  
  Reduced flaky tests  

Run
npm install  
npx playwright test
```

Run tests with a visible browser, or run a specific file:

```bash
npx playwright test --headed
npx playwright test tests/aboutUs.spec.js
```

Filter by a title or tag:

```bash
npx playwright test --grep "@smoke"
```

The configured project is Chromium. The HTML reporter writes a report to `playwright-report/`; open the most recent report with:

```bash
npx playwright show-report
```

## Configuration

Playwright settings are in [`playwright.config.js`](./playwright.config.js):

- Test files are discovered under `tests/`.
- The default project is Chromium.
- Tests run in parallel locally; on CI, retries are enabled and the worker count is limited to one.
- The configured base URL is `https://vivtechguru.com`. Some tests use explicit URLs instead.

The repository also defines `test:headless` and `test:headed` npm scripts. For explicit headed execution, use `npx playwright test --headed` as shown above.

## Project structure

| Path | Purpose |
| --- | --- |
| `tests/` | Playwright UI, API, and database test specs |
| `PageObjectModel/` | Page object classes for site pages |
| `API/` | API client, endpoint constants, and response helpers |
| `utils/` | Data-reading and database utilities |
| `testData/` | JSON test data |
| `JSExample/` | Standalone JavaScript and Playwright learning examples |
| `screenshot/` | Screenshots used by the project |
| `playwright.config.js` | Playwright projects, defaults, and reporter configuration |
| `Jenkinsfile` | Jenkins stages for dependency installation, browser installation, test execution, and reporting |

## Database test setup

The database test is an example that requires local MySQL setup; it is not a prerequisite for running browser or API tests. Before running `tests/db.spec.js`, configure the connection settings in `utils/dbUtils.js` for your environment and provide the database/table/record queried by that test. Do not commit real credentials.

To run only the database spec after setup:

```bash
npx playwright test tests/db.spec.js
```

## CI

The `Jenkinsfile` installs npm dependencies and Playwright browsers, runs the Playwright suite, and exposes the HTML report. Configure the Jenkins agent with Node.js/npm and the shell environment required by the pipeline.
