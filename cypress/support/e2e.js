// ***********************************************************
// Este arquivo é processado e carregado automaticamente antes
// dos arquivos de teste. Este é um ótimo lugar para colocar
// comportamento global e configuração que modifica o Cypress.
// ***********************************************************

import 'cypress-mochawesome-reporter/register';

// Importar commands customizados
import './commands/ui-commands';
// import './commands/api-commands';
// import './commands/common-commands';

// Desabilitar mensagens de erro do Cypress no console
Cypress.on('uncaught:exception', (err, runnable) => {
  // Evitar que erros não capturados falhem o teste
  // Retornar false para não falhar o teste
  return false;
});

// Configuração global antes de cada teste
beforeEach(() => {
  // Limpar cookies e local storage antes de cada teste
  cy.clearCookies();
  cy.clearLocalStorage();
});
