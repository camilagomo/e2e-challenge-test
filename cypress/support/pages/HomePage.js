// Home Page Object - Página Inicial/Home
// ***********************************************************

class HomePage {
  // Page Elements
  elements = {
    logoutButton: () => cy.get('[data-testid="logout"]'),
    productsLink: () => cy.get('[data-testid="link-produtos"]'),
    registerProductButton: () => cy.get('[data-testid="cadastrar-produtos"]'),
    searchInput: () => cy.get('[data-testid="pesquisar"]'),
    userMenu: () => cy.get('[data-testid="usuario"]'),
  };

  // Act
  visit() {
    cy.visit('/home');
  }

  clickLogout() {
    this.elements.logoutButton().click();
  }

  clickProductsLink() {
    this.elements.productsLink().click();
  }

  clickRegisterProduct() {
    this.elements.registerProductButton().click();
  }

  searchProduct(productName) {
    this.elements.searchInput().type(productName);
  }

  // Assert
  shouldRedirectToLogin() {
    cy.url().should('include', '/login');
  }
}

export default new HomePage();
