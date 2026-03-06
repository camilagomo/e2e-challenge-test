// API Test Template - Login
// ***********************************************************

import credentials from '../../support/utils/credentials';

describe('API - Login', () => {
  const apiUrl = 'https://serverest.dev';
  let loginCredentials;

  before(() => {
    cy.fixture('users').then((users) => {
      loginCredentials = users.loginCredentials;
    });
  });

  context('POST - Successful Login', () => {
    it('Should successfully login and return token', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: loginCredentials.valid.email,
          password: credentials.loginValidPassword(),
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Login realizado com sucesso');
        expect(response.body).to.have.property('authorization');
        expect(response.body.authorization).to.include('Bearer ');
      });
    });
  });

  context('POST - Login with Invalid Data', () => {
    it('Should return error 401 when email and/or password are invalid', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: loginCredentials.invalid.email,
          password: 'senhaerrada',
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
      });
    });

    it('Should return validation error when email has invalid format', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: loginCredentials.invalidEmail.email,
          password: credentials.loginValidPassword(),
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('email', 'email deve ser um email válido');
      });
    });

    it('Should return error 401 when password is incorrect', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: loginCredentials.invalidPassword.email,
          password: 'senhaerrada123',
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
      });
    });
  });

  context('POST - Login without Required Fields', () => {
    it('Should return error when email is not provided', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: { password: credentials.loginValidPassword() },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('email');
      });
    });

    it('Should return error when password is not provided', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: { email: loginCredentials.missingPassword.email },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('password');
      });
    });

    it('Should return error when no fields are sent', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: loginCredentials.noFields,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('email');
        expect(response.body).to.have.property('password');
      });
    });
  });
});