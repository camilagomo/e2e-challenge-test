const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    // URLs base para os testes
    baseUrl: 'https://front.serverest.dev',

    // Configurações de viewport
    viewportWidth: 1920,
    viewportHeight: 1080,

    // Configurações de timeout
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,

    // Configurações de retry
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Configurações de vídeo e screenshots
    video: true,
    screenshotOnRunFailure: true,
    videoCompression: 32,

    // Desabilitar animações para testes mais rápidos
    animationDistanceThreshold: 5,
    waitForAnimations: true,

    // Configurações de segurança
    chromeWebSecurity: false,

    // Padrão de arquivos de teste
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Configurações de suporte
    supportFile: 'cypress/support/e2e.js',

    env: {
      // URLs das aplicações
      frontendUrl: 'https://front.serverest.dev',
      apiUrl: 'https://serverest.dev',

      // Configurações da API
      apiTimeout: 10000,
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
