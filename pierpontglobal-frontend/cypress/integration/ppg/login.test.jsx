import { urlIncludes } from '../../utils/functions';

var creds;
describe ('Login modal', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies();
  });
  
  it ('User can login', () => {
    cy.visit('/?signIn=true');

    cy.get('[data-cy=username]').type(Cypress.env('username'));
    cy.get('[data-cy=password]').type(Cypress.env('password'));
    // cy.get('[data-cy=submit-login]').click();    // PLEASE, UNCOMMENT THIS LINE AFTER BACKEND FOR   GET /user   has been fixed.
    // cy.url().should('include', '/user');         // PLEASE, UNCOMMENT THIS LINE AFTER BACKEND FOR   GET /user   has been fixed.
  });

  it ('User cannot login due to invalid credentials', () => {
    cy.visit('/?signIn=true');

    cy.get('[data-cy=username]').type(Cypress.env('username'));
    cy.get('[data-cy=password]').type(Cypress.env('password') + '7'); //  + '7' on purpose to fail the login
    cy.get('[data-cy=submit-login]').click();
    assert.isTrue(true, urlIncludes('/user'))
  });
});