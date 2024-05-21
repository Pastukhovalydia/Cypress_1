const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Установка базового URL для тестов E2E
  },
  viewportWidth: 375,
  viewportHeight: 667,
});
