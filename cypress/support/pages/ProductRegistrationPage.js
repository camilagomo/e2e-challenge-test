// Product Registration Page Object
// ***********************************************************

class ProductRegistrationPage {
  elements = {
    nameInput: () => cy.get('[data-testid="nome"]'),
    priceInput: () => cy.get('[data-testid="preco"]'),
    descriptionInput: () => cy.get('[data-testid="descricao"]'),
    quantityInput: () => cy.get('[data-testid="quantity"]'),
    submitButton: () => cy.get('[data-testid="cadastarProdutos"]'),
  };

  visit() {
    cy.visit('/cadastrarprodutos');
  }

  fillName(name) {
    this.elements.nameInput().clear().type(name);
  }

  fillPrice(price) {
    this.elements.priceInput().clear().type(price);
  }

  fillDescription(description) {
    this.elements.descriptionInput().clear().type(description);
  }

  fillQuantity(quantity) {
    this.elements.quantityInput().clear().type(quantity);
  }

  fillForm({ nome, preco, descricao, quantidade }) {
    if (nome) this.fillName(nome);
    if (preco !== '' && preco !== undefined) this.fillPrice(preco);
    if (descricao) this.fillDescription(descricao);
    if (quantidade !== '' && quantidade !== undefined) this.fillQuantity(quantidade);
  }

  submit() {
    this.elements.submitButton().click();
  }

  shouldHaveValues({ nome, preco, descricao, quantidade }) {
    this.elements.nameInput().should('have.value', nome);
    this.elements.priceInput().should('have.value', String(preco));
    this.elements.descriptionInput().should('have.value', descricao);
    this.elements.quantityInput().should('have.value', String(quantidade));
  }

  shouldRedirectAfterSuccess() {
    cy.url().should('include', '/admin/listarprodutos');
  }
}

export default new ProductRegistrationPage();
