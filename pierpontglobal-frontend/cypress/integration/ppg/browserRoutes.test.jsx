import ApplicationRoutes from '../../../src/constants/Routes';
import { urlIncludes } from '../../utils/functions';

describe('Secure routes should redirects user to Home page', () => {

  beforeEach(() => {
    Cypress.Cookies.debug(true);
    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies();
  });

  it('Navigate to Marketplace without logged in, should redirect to Home page.', () =>{
    cy.visit('/');
    cy.get('[data-cy=navbar-marketplace]').click();
    cy.wait(600); // Waits for redirection
    cy.url().should('include', ApplicationRoutes.home)
    // Test if login modal appears too
    cy.url().should('include', 'signIn=true')
  });

  it('Navigate to Profile without logged in, should redirect to Home page', () => {
    cy.visit(`${Cypress.config().baseUrl + ApplicationRoutes.profilePage.default}`);
    cy.wait(600); // Waits for redirection
    cy.url().should('include', ApplicationRoutes.home)
    // Test if login modal appears too
    cy.url().should('include', 'signIn=true')
  });

});

describe('Unsecure routes should render properly', async () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies();
  });

  it('Navigate to Contact page should render it.', () =>{
    cy.visit('/');
    cy.get('[data-cy=navbar-contact]').click();
    cy.wait(600); // Waits for redirection
    cy.url().should('include', ApplicationRoutes.contactPage)
  });

});