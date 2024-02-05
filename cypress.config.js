const { defineConfig } = require("cypress");
require("dotenv").config();

let saved;
module.exports = defineConfig({
  env: {
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    email: "jtstccnt@gmail.com",
    password: "TestAcctAutomati0n",
  },
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
