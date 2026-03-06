// UI Tests - Login and User Registration
// ***********************************************************

import LoginPage from '../../support/pages/LoginPage';
import { faker } from '@faker-js/faker';
import credentials from '../../support/utils/credentials';

// -------------------------------------------------------
// Login - Negative Scenarios + API Interception
// -------------------------------------------------------
describe('UI - Login', () => {
  let loginData;

  before(() => {
    cy.fixture('users').then((users) => {
      loginData = users.loginCredentials;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  context('Login - Negative Scenarios', () => {
    it('Should show error message when credentials are invalid', () => {
      // Act
      LoginPage.login(loginData.invalid.email, credentials.loginValidPassword());

      // Assert
      LoginPage.shouldShowErrorMessage('Email e/ou senha inválidos');
    });

    it('Should show error message when email is empty', () => {
      // Act - type only password, leave email blank
      cy.get('[data-testid="senha"]').type(credentials.loginValidPassword());
      cy.get('[data-testid="entrar"]').click();

      // Assert
      LoginPage.shouldShowErrorMessage('Email é obrigatório');
    });

    it('Should show error message when password is empty', () => {
      // Act
      cy.get('[data-testid="email"]').type(loginData.valid.email);
      cy.get('[data-testid="entrar"]').click();

      // Assert
      LoginPage.shouldShowErrorMessage('Password é obrigatório');
    });
  });

  context('Login - API Interception', () => {
    it('Should call POST /login when submitting login form', () => {
      // Arrange
      cy.intercept('POST', '**/login').as('loginRequest');

      // Act
      LoginPage.login(loginData.valid.email, credentials.loginValidPassword());

      // Assert - validate request was made
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.request.body).to.have.property('email', loginData.valid.email);
        expect(interception.request.body).to.have.property('password');
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('Should receive 401 from POST /login with invalid credentials', () => {
      // Arrange
      cy.intercept('POST', '**/login').as('loginRequest');

      // Act
      LoginPage.login(loginData.invalid.email, 'wrongpassword');

      // Assert
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(401);
        expect(interception.response.body).to.have.property('message');
      });
    });
  });
});

// -------------------------------------------------------
// User Registration
// -------------------------------------------------------
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