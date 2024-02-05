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
        cy.document().its("cookie").should("exist");
        cy.getCookie("NID").should("exist");
      },
    }
  );
});

Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      };

      window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
      cy.visit("/");
    });
  });
});
