// API Test Template - Users
// ***********************************************************

import credentials from '../../support/utils/credentials';

describe('API - Users', () => {
  const apiUrl = 'https://serverest.dev';
  let userData;
  let createUserData;
  let createdUserId;

  before(() => {
    cy.fixture('users').then((users) => {
      userData = users;
      createUserData = users.createUserData;
    });
  });

  context('POST - Create User Successfully', () => {
    it('Should create a new user successfully', () => {
      // Arrange
      const uniqueEmail = `user${Date.now()}@qa.com.br`;
      const newUser = {
        ...userData.validUser,
        email: uniqueEmail,
        password: credentials.userPassword(),
      };

      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: newUser,
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

  context('POST - Create User with Invalid Data', () => {
    it('Should return error 400 when email is already registered', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: { ...userData.validUser, password: credentials.userPassword() },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Este email já está sendo usado');
      });
    });

    it('Should return error 400 when name is empty', () => {
      // Arrange
      const uniqueEmail = `user${Date.now()}@qa.com.br`;
      const userWithoutName = {
        ...createUserData.userWithoutName,
        email: uniqueEmail,
        password: credentials.userPassword(),
      };

      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: userWithoutName,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('nome', 'nome não pode ficar em branco');
      });
    });

    it('Should return error 400 when email has invalid format', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: { ...createUserData.userWithInvalidEmail, password: credentials.userPassword() },
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('email', 'email deve ser um email válido');
      });
    });

    it('Should return error 400 when password is empty', () => {
      // Arrange
      const uniqueEmail = `user${Date.now()}@qa.com.br`;
      const userWithoutPassword = {
        ...createUserData.userWithoutPassword,
        email: uniqueEmail,
        password: '',
      };

      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: userWithoutPassword,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('password', 'password não pode ficar em branco');
      });
    });

    it('Should return error 400 when no fields are sent', () => {
      // Act
      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: createUserData.noFields,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('nome', 'nome é obrigatório');
        expect(response.body).to.have.property('email', 'email é obrigatório');
        expect(response.body).to.have.property('password', 'password é obrigatório');
        expect(response.body).to.have.property('administrador', 'administrador é obrigatório');
      });
    });
  });

  context('GET - Get User by ID', () => {
    it('Should get user by valid ID successfully', () => {
      // Arrange - First create a user to get its ID
      const uniqueEmail = `getuser${Date.now()}@qa.com.br`;
      const newUser = {
        ...userData.validUser,
        email: uniqueEmail,
        password: credentials.userPassword(),
      };

      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: newUser,
        failOnStatusCode: false,
      }).then((createResponse) => {
        createdUserId = createResponse.body._id;

        // Act - Get the created user by ID
        cy.request({
          method: 'GET',
          url: `${apiUrl}/usuarios/${createdUserId}`,
          failOnStatusCode: false,
        }).then((response) => {
          // Assert
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('nome', newUser.nome);
          expect(response.body).to.have.property('email', newUser.email);
          expect(response.body).to.have.property('administrador', newUser.administrador);
          expect(response.body).to.have.property('_id', createdUserId);
        });
      });
    });

    it('Should return error 400 when user ID does not exist', () => {
      // Arrange
      const nonExistentId = 'abc1234567890123';

      // Act
      cy.request({
        method: 'GET',
        url: `${apiUrl}/usuarios/${nonExistentId}`,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Usuário não encontrado');
      });
    });

    it('Should return error 400 when user ID has invalid format', () => {
      // Arrange
      const invalidFormatId = 'invalidId';

      // Act
      cy.request({
        method: 'GET',
        url: `${apiUrl}/usuarios/${invalidFormatId}`,
        failOnStatusCode: false,
      }).then((response) => {
        // Assert
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('id', 'id deve ter exatamente 16 caracteres alfanuméricos');
      });
    });
  });
});