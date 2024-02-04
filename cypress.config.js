const { defineConfig } = require("cypress");
let saved;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://translate.google.com/",
    watchForFileChanges: false,
    chromeWebSecurity: false,
    hideXHRInCommandLog: true,
    testIsolation: false,
    setupNodeEvents(on, config) {
      on("task", {
        storeVal(val) {
          saved = val;
          return null;
        },
        getStoredVal() {
          return saved;
        },
      });
    },
  },
});
