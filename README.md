# E2E Testing Project - ServeRest

E2E test automation project using Cypress for the frontend and API of the ServeRest application.

## About the Project

This project implements end-to-end (E2E) automated tests for:
- **Frontend**: https://front.serverest.dev/
- **API**: https://serverest.dev/

## Technologies Used

- **Cypress** - E2E testing framework
- **JavaScript** - Programming language
- **Node.js** - JavaScript runtime environment
- **GitHub Actions** - CI/CD pipeline for automated test execution

## CI/CD

This project uses **GitHub Actions** to automatically run all Cypress tests on every Pull Request targeting `main`.

The workflow:
- Runs on `ubuntu-latest` using Chrome browser
- Injects credentials via GitHub Secrets
- Uploads screenshots on test failure
- Uploads videos after every run

Workflow file: `.github/workflows/cypress-ci.yml`

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `USER_PASSWORD` | Password for regular user |
| `ADMIN_PASSWORD` | Password for admin user |
| `LOGIN_VALID_EMAIL` | Valid login email |
| `LOGIN_VALID_PASSWORD` | Valid login password |

## Project Structure

```
e2e-cypress-test/
├── cypress/
│   ├── e2e/
│   │   ├── api/              # API Tests
│   │   └── ui/               # UI Tests
│   ├── fixtures/             # Data Tests (JSON)
│   │   ├── users.json
│   │   ├── products.json
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
git clone <repository-url>
cd e2e-cypress-test
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
