# E2E Testing Project - ServeRest

E2E test automation project using Cypress for the frontend and API of the ServeRest application.

## About the Project

This project implements end-to-end (E2E) automated tests for:
- **Frontend**: https://front.serverest.dev/
- **API**: https://serverest.dev/

## Technologies Used

- **Cypress** - E2E testing framework
- **JavaScript** - Programming language
- **Faker.js** - Library for generating fake data
- **Node.js** - JavaScript runtime environment
- **GitHub Actions** - CI/CD pipeline for automated test execution

## CI/CD
[![Cypress CI](https://github.com/camilagomo/e2e-challenge-test/actions/workflows/cypress-ci.yml/badge.svg)](https://github.com/camilagomo/e2e-challenge-test/actions/workflows/cypress-ci.yml)

This project uses **GitHub Actions** to automatically run all Cypress tests on every Pull Request targeting `main`.

The workflow:
- Runs on `ubuntu-latest` using Chrome browser
- Injects credentials via GitHub Secrets (never exposed in code)
- Uploads screenshots on test failure
- Uploads videos after every run

Workflow file: `.github/workflows/cypress-ci.yml`

## Project Structure

```
e2e-cypress-test/
├── cypress/
│   ├── e2e/
│   │   ├── api/              # API Tests
│   │   │   ├── login.cy.js
│   │   │   ├── users.cy.js
│   │   └── ui/               # UI Tests
│   │       ├── login.cy.js
│   ├── fixtures/             # Data Tests (JSON)
│   │   ├── users.json
│   │   ├── products.json
│   │   └── messages.json
│   ├── support/
│   │   ├── commands/         # Custom Commands
│   │   ├── pages/            # Page Objects
│   │   ├── utils/            # Utils and Helpers
│   │   └── e2e.js            # Global config
│   ├── downloads/            # Tests downloads
│   ├── screenshots/          # Failed Screenshots
│   └── videos/               # Videos
├── cypress.config.js         # Cypress Config
├── package.json              # Project Dependencies
└── README.md                 # Documentation

```

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/camilagomo/e2e-challenge-test.git
cd e2e-challenge-test
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

### Interactive Mode (Cypress Interface)
```bash
npm run cy:open
```

### Headless Mode (Command Line)

Run all tests:
```bash
npm run test:all
```

Run UI tests only:
```bash
npm run test:ui
```

Run API tests only:
```bash
npm run test:api
```

Run with specific browser:
```bash
npm run test:chrome
npm run test:firefox
```

Run in headed mode (with visible browser):
```bash
npm run test:headed
```

## Design Patterns Used

### Page Object Model (POM)
- Centralizes elements and actions for each page
- Facilitates maintenance and code reuse
- Location: `cypress/support/pages/`

### Custom Commands
- Reusable commands for common actions
- Separated by context (UI, API, Common)
- Location: `cypress/support/commands/`

### Fixtures
- Test data storage in JSON
- Facilitates data management
- Location: `cypress/fixtures/`

### Helpers/Utils
- Helper functions for validations and data generation
- DataGenerator: Generates fake data using Faker.js
- ApiValidator: Standardized API validations
- Location: `cypress/support/utils/`

## Test Structure

### UI Tests
UI tests follow this pattern:
```javascript
describe('Feature', () => {
  beforeEach(() => {
    // Setup before each test
  });

  context('Specific context', () => {
    it('Should do something specific', () => {
      // Arrange - Prepare
      // Act - Execute
      // Assert - Validate
    });
  });
});
```

### API Tests
API tests follow this pattern:
```javascript
describe('API - Resource', () => {
  before(() => {
    // Setup once before all tests
  });

  after(() => {
    // Cleanup after all tests
  });

  context('HTTP Method - Scenario', () => {
    it('Should return expected behavior', () => {
      // Arrange - Prepare data
      // Act - Make request
      // Assert - Validate response
    });
  });
});
```

## Available Custom Commands

### UI Commands
- `cy.login(email, password)` - Login to application
- `cy.logout()` - Logout
- `cy.fillRegistrationForm(userData)` - Fill registration form
- `cy.waitForLoading()` - Wait for loading to disappear

### API Commands
- `cy.apiLogin(email, password)` - Login via API
- `cy.apiCreateUser(userData)` - Create user via API
- `cy.apiGetUsers(params)` - List users via API
- `cy.apiDeleteUser(userId, token)` - Delete user via API
- `cy.apiCreateProduct(productData, token)` - Create product via API
- `cy.apiGetProducts(params)` - List products via API
- `cy.apiDeleteProduct(productId, token)` - Delete product via API

## Available Fixtures

### users.json
Contains user data for tests:
- `validUser` - Valid admin user
- `nonAdminUser` - Valid regular user
- `invalidUser` - Invalid data for negative tests

## Configuration

Cypress configurations are in `cypress.config.js`:
- Base URLs (frontend and API)
- Timeouts
- Retry settings
- Video and screenshot settings

Environment variables can be accessed via:
```javascript
Cypress.env('apiUrl')
Cypress.env('frontendUrl')
```

## Reports

After test execution:
- **Videos**: Saved in `cypress/videos/`
- **Screenshots**: Saved in `cypress/screenshots/`
- **Results**: Displayed in terminal

## Contributing

1. Clone the project
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## Author
Camila Monteiro 
