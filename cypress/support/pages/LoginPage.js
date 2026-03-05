// ***********************************************************
// Login Page Object - Página de Login
// ***********************************************************

class LoginPage {
  // Elementos da página
  elements = {
    emailInput: () => cy.get('[data-testid="email"]'),
    passwordInput: () => cy.get('[data-testid="senha"]'),
    loginButton: () => cy.get('[data-testid="entrar"]'),
    registerLink: () => cy.get('[data-testid="cadastrar"]'),
    errorMessage: () => cy.get('.alert'),
    emailError: () => cy.get('[data-testid="email-error"]'),
    passwordError: () => cy.get('[data-testid="password-error"]'),
  };

  // Ações
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    this.elements.emailInput().clear().type(email);
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  clickLoginButton() {
    this.elements.loginButton().click();
  }

  clickRegisterLink() {
    this.elements.registerLink().click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLoginButton();
  }

  // Validações
  shouldShowErrorMessage(message) {
    this.elements.errorMessage().should('be.visible').and('contain.text', message);
  }

  shouldBeVisible() {
    this.elements.emailInput().should('be.visible');
    this.elements.passwordInput().should('be.visible');
    this.elements.loginButton().should('be.visible');
  }

  shouldRedirectToHome() {
    cy.url().should('include', '/home');
  }
}

export default new LoginPage();
