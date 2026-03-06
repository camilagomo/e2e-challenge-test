// Product Registration Page Object
// ***********************************************************

class ProductRegistrationPage {
  // Page Elements
  elements = {
    nameInput: () => cy.get('[data-testid="nome"]'),
    priceInput: () => cy.get('[data-testid="preco"]'),
    descriptionInput: () => cy.get('[data-testid="descricao"]'),
    quantityInput: () => cy.get('[data-testid="quantity"]'),
    submitButton: () => cy.get('[data-testid="cadastarProdutos"]'),
  };

  // Act
  fillName(name) {
    this.elements.nameInput().type(name);
  }

  fillPrice(price) {
    this.elements.priceInput().type(price);
  }

  fillDescription(description) {
    this.elements.descriptionInput().type(description);
  }

  fillQuantity(quantity) {
    this.elements.quantityInput().type(quantity);
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

  // Assert
  shouldHaveValues({ nome, preco, descricao, quantidade }) {
    this.elements.nameInput().should('have.value', nome);
    this.elements.priceInput().should('have.value', String(preco));
    this.elements.descriptionInput().should('have.value', descricao);
    this.elements.quantityInput().should('have.value', String(quantidade));
  }
}

export default new ProductRegistrationPage();
