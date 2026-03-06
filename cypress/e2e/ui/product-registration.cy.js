// UI Test - Product Registration
// ***********************************************************

import HomePage from '../../support/pages/HomePage';
import ProductRegistrationPage from '../../support/pages/ProductRegistrationPage';
import { faker } from '@faker-js/faker';

describe('UI - Product Registration', () => {
  let productData;

  before(() => {
    cy.fixture('products').then((products) => {
      productData = products;
    });
  });

  beforeEach(() => {
    cy.loginAsAdmin();
    HomePage.clickRegisterProduct();
  });

  // -------------------------------------------------------
  // Scenario 1: Navigate to product registration
  // -------------------------------------------------------
  context('Navigation - Product Registration', () => {
    it('Should navigate to product registration page', () => {
      cy.url().should('include', '/cadastrarprodutos');
    });
  });

  // -------------------------------------------------------
  // Scenario 2: Fill in product form
  // -------------------------------------------------------
  context('Form - Fill Product Fields', () => {
    it('Should fill in all product fields correctly', () => {
      // Act
      ProductRegistrationPage.fillForm(productData.validProduct);

      // Assert
      ProductRegistrationPage.shouldHaveValues(productData.validProduct);
    });
  });

  // -------------------------------------------------------
  // Scenario 3: Register product successfully
  // -------------------------------------------------------
  context('Registration - Product Successfully', () => {
    it('Should successfully register a new product and redirect to product list', () => {
      // Arrange
      const uniqueProduct = {
        ...productData.validProduct,
        nome: `${productData.validProduct.nome} ${faker.string.alphanumeric(5)}`,
      };

      // Act
      ProductRegistrationPage.fillForm(uniqueProduct);
      ProductRegistrationPage.submit();

      // Assert
      ProductRegistrationPage.shouldRedirectAfterSuccess();
    });
  });

  // -------------------------------------------------------
  // Scenario 4: Required field validation
  // -------------------------------------------------------
  context('Validation - Required Fields', () => {
    it('Should not register product when name is empty', () => {
      // Act
      ProductRegistrationPage.fillForm(productData.createProductData.withoutName);
      ProductRegistrationPage.submit();

      // Assert
      cy.url().should('include', '/cadastrarprodutos');
    });

    it('Should not register product when price is empty', () => {
      // Act
      ProductRegistrationPage.fillForm(productData.createProductData.withoutPrice);
      ProductRegistrationPage.submit();

      // Assert
      cy.url().should('include', '/cadastrarprodutos');
    });
  });
});
