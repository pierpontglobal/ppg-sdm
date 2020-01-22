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
Cypress.Commands.add("login", (username, password) => { 
  cy.request({
    url: Cypress.env('apiUrl') + '/api/v2/users/login',
    method: 'POST',
    body: {
      username: username,
      password: password,
      grant_type: 'password',
    }
  }).then((res) => {
    console.log('Response >>>>>>');
    console.log(res);
    cy.setCookie('token', res.body.access_token);
  })
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
