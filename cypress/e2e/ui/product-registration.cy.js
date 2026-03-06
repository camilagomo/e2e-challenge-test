// UI Test - Product Registration
// ***********************************************************

import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';
import { faker } from '@faker-js/faker';
import credentials from '../../support/utils/credentials';

describe('UI - Product Registration', () => {
  let productData;
  let loginData;

  before(() => {
    cy.fixture('products').then((products) => {
      productData = products;
    });
    cy.fixture('users').then((users) => {
      loginData = users.loginCredentials;
    });
  });

  beforeEach(() => {
    // Login as admin before each test
    LoginPage.visit();
    cy.get('[data-testid="email"]').type(loginData.valid.email);
    cy.get('[data-testid="senha"]').type(credentials.loginValidPassword());
    cy.get('[data-testid="entrar"]').click();
    cy.url().should('include', '/home');
  });

  // -------------------------------------------------------
  // Scenario 1: Navigate to product registration
  // -------------------------------------------------------
  context('Navigation - Product Registration', () => {
    it('Should navigate to product registration page', () => {
      // Act
      HomePage.clickRegisterProduct();

      // Assert
      cy.url().should('include', '/cadastrarprodutos');
    });
  });

  // -------------------------------------------------------
  // Scenario 2: Fill in product form
  // -------------------------------------------------------
  context('Form - Fill Product Fields', () => {
    it('Should fill in product name, price, description and quantity', () => {
      // Arrange
      HomePage.clickRegisterProduct();

      // Act
      cy.get('[data-testid="nome"]').type(productData.validProduct.nome);
      cy.get('[data-testid="preco"]').type(productData.validProduct.preco);
      cy.get('[data-testid="descricao"]').type(productData.validProduct.descricao);
      cy.get('[data-testid="quantidade"]').type(productData.validProduct.quantidade);

      // Assert
      cy.get('[data-testid="nome"]').should('have.value', productData.validProduct.nome);
      cy.get('[data-testid="preco"]').should('have.value', String(productData.validProduct.preco));
      cy.get('[data-testid="descricao"]').should('have.value', productData.validProduct.descricao);
      cy.get('[data-testid="quantidade"]').should('have.value', String(productData.validProduct.quantidade));
    });
  });

  // -------------------------------------------------------
  // Scenario 3: Register product successfully
  // -------------------------------------------------------
  context('Registration - Product Successfully', () => {
    it('Should successfully register a new product', () => {
      // Arrange
      const uniqueName = `${productData.validProduct.nome} ${faker.string.alphanumeric(5)}`;
      HomePage.clickRegisterProduct();

      // Act
      cy.get('[data-testid="nome"]').type(uniqueName);
      cy.get('[data-testid="preco"]').type(productData.validProduct.preco);
      cy.get('[data-testid="descricao"]').type(productData.validProduct.descricao);
      cy.get('[data-testid="quantidade"]').type(productData.validProduct.quantidade);
      cy.get('[data-testid="cadastrar"]').click();

      // Assert
      cy.url().should('include', '/admin/listarprodutos');
    });
  });
});