// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, pass) => {
  cy.intercept("POST", "**/signin/_/AccountsSignInUi/data/**").as(
    "nextLoginForm"
  );
  cy.session(
    [email, pass],
    () => {
      const loginargs = { email, pass };
      cy.origin(
        "https://accounts.google.com",
        { args: loginargs },
        ({ email, pass }) => {
          const resizeObserverLoopError =
            /^[^(ResizeObserver loop limit exceeded)]/;
          Cypress.on("uncaught:exception", (err) => {
            if (resizeObserverLoopError.test(err.message)) {
              return false;
            }
          });

          cy.visit("/");
          cy.get('[aria-label="Email or phone"]').type(email);
          cy.contains("Next").click();
          // cy.wait("@nextLoginForm")
          //   .its("response.statusCode")
          //   .should("equal", 200);
          cy.get('[aria-label="Enter your password"]').type(pass);
          cy.contains("Next").click();
        }
      );
    },
    {
      validate() {
        cy.document().its("cookie").should('exist');
        cy.getCookie('NID').should('exist')
      },
    }
  );
});
