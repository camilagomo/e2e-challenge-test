// UI Custom Commands
// ***********************************************************

import credentials from '../utils/credentials';

Cypress.Commands.add('loginAsAdmin', () => {
  cy.fixture('users').then((users) => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(users.loginCredentials.valid.email);
    cy.get('[data-testid="senha"]').type(credentials.loginValidPassword());
    cy.get('[data-testid="entrar"]').click();
    cy.url().should('include', '/home');
  });
});
