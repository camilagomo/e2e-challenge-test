// API Test Template - Products
// ***********************************************************

import credentials from '../../support/utils/credentials';

describe('API - Products', () => {
  const apiUrl = 'https://serverest.dev';
  let productData;
  let adminToken;
  let nonAdminToken;

  before(() => {
    cy.fixture('products').then((products) => {
      productData = products;

      cy.fixture('users').then((users) => {
        // Login as admin to get auth token
        cy.request({
          method: 'POST',
          url: `${apiUrl}/login`,
          body: {
            email: users.loginCredentials.valid.email,
            password: credentials.loginValidPassword(),
          },
          failOnStatusCode: false,
        }).then((response) => {
          adminToken = response.body.authorization;

          // Create and login as non-admin user (sequentially after admin token)
          const uniqueEmail = `nonadmin${Date.now()}@qa.com.br`;
          const nonAdminUser = {
            ...users.nonAdminUser,
            email: uniqueEmail,
            password: credentials.userPassword(),
          };

          cy.request({
            method: 'POST',
            url: `${apiUrl}/usuarios`,
            body: nonAdminUser,
            failOnStatusCode: false,
          }).then(() => {
            cy.request({
              method: 'POST',
              url: `${apiUrl}/login`,
              body: {
                email: uniqueEmail,
                password: credentials.userPassword(),
              },
              failOnStatusCode: false,
            }).then((loginResponse) => {
              nonAdminToken = loginResponse.body.authorization;
            });
          });
        });
      });
    });
  });

  context('POST - Create Product Successfully', () => {
    it('Should create a new product successfully with admin token', () => {
      // Arrange
      const uniqueProductName = `Product ${Date.now()}`;
      const newProduct = {
        ...productData.validProduct,
        nome: uniqueProductName,
      };

      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: {
          Authorization: adminToken,
        },
        body: newProduct,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        expect(response.body._id).to.be.a('string');
      });
    });
  });

  context('POST - Create Product with Invalid Data', () => {
    it('Should return error 400 when product name already exists', () => {
      // Arrange - Create a product first
      const duplicateProductName = `Duplicate ${Date.now()}`;
      const product = {
        ...productData.validProduct,
        nome: duplicateProductName,
      };

      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: {
          Authorization: adminToken,
        },
        body: product,
        failOnStatusCode: false,
      }).then(() => {
        // Act - Try to create product with same name
        cy.request({
          method: 'POST',
          url: `${apiUrl}/produtos`,
          headers: {
            Authorization: adminToken,
          },
          body: product,
          failOnStatusCode: false,
        }).then((response) => {
          // Assert
          expect(response.status).to.eq(400);
          expect(response.body).to.have.property('message', 'Já existe produto com esse nome');
        });
      });
    });

    it('Should return error 401 when token is not provided', () => {
      // Arrange
      const uniqueProductName = `Product ${Date.now()}`;
      const newProduct = {
        ...productData.validProduct,
        nome: uniqueProductName,
      };

      // Act - Request without Authorization header
      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        body: newProduct,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
      });
    });

    it('Should return error 401 when token is invalid', () => {
      // Arrange
      const uniqueProductName = `Product ${Date.now()}`;
      const newProduct = {
        ...productData.validProduct,
        nome: uniqueProductName,
      };

      // Act - Request with invalid token
      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: {
          Authorization: 'Bearer invalidToken123',
        },
        body: newProduct,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
      });
    });

    it('Should return error 403 when user is not admin', () => {
      // Arrange
      const uniqueProductName = `Product ${Date.now()}`;
      const newProduct = {
        ...productData.validProduct,
        nome: uniqueProductName,
      };

      // Act - Request with non-admin token
      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: {
          Authorization: nonAdminToken,
        },
        body: newProduct,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(403);
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores');
      });
    });
  });
});