// UI Test - User Registration
// ***********************************************************

import LoginPage from '../../support/pages/LoginPage';
import { faker } from '@faker-js/faker';
import credentials from '../../support/utils/credentials';

describe('UI - User Registration', () => {
  let cadastroUser;

  before(() => {
    cy.fixture('users').then((users) => {
      cadastroUser = users.cadastroUser;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  // -------------------------------------------------------
  // Scenario 1: Regular user registration
  // -------------------------------------------------------
  context('Registration - Regular User', () => {
    it('Should navigate to registration page when clicking Sign Up', () => {
      // Act
      LoginPage.clickRegisterLink();

      // Assert
      cy.url().should('include', '/cadastrarusuarios');
    });

    it('Should fill in name, email and password for regular user', () => {
      // Arrange
      LoginPage.clickRegisterLink();

      // Act
      cy.get('[data-testid="nome"]').type(cadastroUser.regularUser.nome);
      cy.get('[data-testid="email"]').type(cadastroUser.regularUser.email);
      cy.get('[data-testid="password"]').type(credentials.userPassword());

      // Assert
      cy.get('[data-testid="nome"]').should('have.value', cadastroUser.regularUser.nome);
      cy.get('[data-testid="email"]').should('have.value', cadastroUser.regularUser.email);
      cy.get('[data-testid="password"]').should('have.value', credentials.userPassword());
    });

    it('Should successfully register a regular user', () => {
      // Arrange
      const uniqueEmail = faker.internet.email();
      LoginPage.clickRegisterLink();

      // Act
      cy.get('[data-testid="nome"]').type(cadastroUser.regularUser.nome);
      cy.get('[data-testid="email"]').type(uniqueEmail);
      cy.get('[data-testid="password"]').type(credentials.userPassword());
      cy.get('[data-testid="cadastrar"]').click();

      // Assert
      cy.url().should('include', '/home');
    });
  });

  // -------------------------------------------------------
  // Scenario 2: Admin user registration
  // -------------------------------------------------------
  context('Registration - Admin User', () => {
    it('Should navigate to registration page when clicking Sign Up', () => {
      // Act
      LoginPage.clickRegisterLink();

      // Assert
      cy.url().should('include', '/cadastrarusuarios');
    });

    it('Should fill in name, email, password and check admin checkbox', () => {
      // Arrange
      LoginPage.clickRegisterLink();

      // Act
      cy.get('[data-testid="nome"]').type(cadastroUser.adminUser.nome);
      cy.get('[data-testid="email"]').type(cadastroUser.adminUser.email);
      cy.get('[data-testid="password"]').type(credentials.adminPassword());
      cy.get('[data-testid="checkbox"]').check();

      // Assert
      cy.get('[data-testid="nome"]').should('have.value', cadastroUser.adminUser.nome);
      cy.get('[data-testid="email"]').should('have.value', cadastroUser.adminUser.email);
      cy.get('[data-testid="password"]').should('have.value', credentials.adminPassword());
      cy.get('[data-testid="checkbox"]').should('be.checked');
    });

    it('Should successfully register an admin user', () => {
      // Arrange
      const uniqueEmail = faker.internet.email();
      LoginPage.clickRegisterLink();

      // Act
      cy.get('[data-testid="nome"]').type(cadastroUser.adminUser.nome);
      cy.get('[data-testid="email"]').type(uniqueEmail);
      cy.get('[data-testid="password"]').type(credentials.adminPassword());
      cy.get('[data-testid="checkbox"]').check();
      cy.get('[data-testid="cadastrar"]').click();

      // Assert
      cy.url().should('include', '/home');
    });
  });
});