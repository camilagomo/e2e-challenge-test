// Credentials Util
// Centralizes access to sensitive data via environment variables.
// Never hardcode passwords here — use cypress.env.json (gitignored) or CI secrets.

const credentials = {
  userPassword: () => Cypress.env('USER_PASSWORD'),
  adminPassword: () => Cypress.env('ADMIN_PASSWORD'),
  loginValidEmail: () => Cypress.env('LOGIN_VALID_EMAIL'),
  loginValidPassword: () => Cypress.env('LOGIN_VALID_PASSWORD'),
};

export default credentials;