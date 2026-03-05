// ***********************************************************
// Home Page Object - Página Inicial/Home
// ***********************************************************

class HomePage {
  // Elementos da página
  elements = {
    welcomeMessage: () => cy.get('[data-testid="welcome"]'),
    logoutButton: () => cy.get('[data-testid="logout"]'),
    productsLink: () => cy.get('[data-testid="link-produtos"]'),
    registerProductButton: () => cy.get('[data-testid="cadastrar-produtos"]'),
    productsList: () => cy.get('[data-testid="lista-produtos"]'),
    searchInput: () => cy.get('[data-testid="pesquisar"]'),
    userMenu: () => cy.get('[data-testid="usuario"]'),
  };

  // Ações
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

  // Validações
  shouldBeVisible() {
    this.elements.welcomeMessage().should('be.visible');
  }

  shouldShowWelcomeMessage(userName) {
    this.elements.welcomeMessage().should('contain.text', userName);
  }

  shouldDisplayProducts() {
    this.elements.productsList().should('be.visible');
  }

  shouldRedirectToLogin() {
    cy.url().should('include', '/login');
  }
}

export default new HomePage();
