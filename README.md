# Playwright QA Automation Framework

[![Playwright Tests](https://github.com/eilam-git/playwright-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/eilam-git/playwright-qa-automation/actions/workflows/playwright.yml)

An end-to-end test automation framework built with **Playwright and TypeScript**, demonstrating modern QA automation practices including Page Object Model (POM), custom fixtures, test data management, cross-browser testing, and CI/CD integration.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Git

## Features

- Page Object Model architecture
- Reusable custom Playwright fixtures
- Centralized test data management
- Positive and negative test scenarios
- Cross-browser testing (Chromium, Firefox, WebKit)
- Automated CI/CD execution with GitHub Actions
- HTML test reports
- Screenshots and videos for debugging

## Project Structure

```text
playwright-qa-automation/
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── fixtures/
│   └── testFixtures.ts
├── test-data/
│   └── users.ts
├── .github/workflows/
│   └── playwright.yml
├── playwright.config.ts
├── package.json
└── README.md
```

## Test Coverage

### Login Tests
- Successful login with valid credentials
- Invalid username and password
- Empty credentials validation
- Locked-out user validation

### Shopping Cart Tests
- Add product to cart
- Remove product from cart
- Verify cart badge and product details

### Checkout Tests
- Complete purchase successfully
- Missing first name validation
- Missing last name validation
- Missing postal code validation

## Installation

Clone the repository:

```bash
git clone https://github.com/eilam-git/playwright-qa-automation.git
cd playwright-qa-automation
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run Chromium tests:

```bash
npx playwright test --project=chromium
```

Run login tests:

```bash
npx playwright test tests/login.spec.ts
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Open HTML report:

```bash
npx playwright show-report
```

## CI/CD

The project uses GitHub Actions to run automated Playwright tests.

The workflow is located at:

`.github/workflows/playwright.yml`

Test results and reports are available in the GitHub Actions workflow runs.

## Test Application

The automation tests the public demo application:

https://www.saucedemo.com/

## Author

Eilam Cnaan

QA Engineer specializing in manual testing, web and mobile testing, and test automation.

GitHub: https://github.com/eilam-git
