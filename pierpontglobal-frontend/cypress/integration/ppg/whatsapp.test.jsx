import ApplicationRoutes from '../../../src/constants/Routes';

describe ('Whatsapp icon', () => {
  
  it ('On click to button it should open if its closed.', () => {
    cy.visit(ApplicationRoutes.home);
    cy.get('[data-cy=ws-click-handler]').should('have.css', 'display')
      .and('match', /none/);
    cy.get('[data-cy=ws-list-component]').should('have.css', 'display')
      .and('match', /none/);

    cy.get('[data-cy=whatsapp-button]').click();

    cy.get('[data-cy=ws-click-handler]').should('have.css', 'display')
      .and('match', /block/);
    cy.get('[data-cy=ws-list-component]').should('have.css', 'display')
      .and('match', /flex/);
  });

  it ('On click to button it should close if its opened.', () => {
    cy.visit(ApplicationRoutes.home);
    // Open it
    cy.get('[data-cy=whatsapp-button]').click();

    cy.get('[data-cy=ws-click-handler]').should('have.css', 'display')
      .and('match', /block/);
    cy.get('[data-cy=ws-list-component]').should('have.css', 'display')
      .and('match', /flex/);

    // Close it
    cy.get('[data-cy=whatsapp-button]').click();

    cy.get('[data-cy=ws-click-handler]').should('have.css', 'display')
      .and('match', /none/);
    cy.get('[data-cy=ws-list-component]').should('have.css', 'opacity')
      .and('match', /0/);
  });

  it('On click to click listener "darker auter area" it should close if its open.', () => {
    cy.visit(ApplicationRoutes.home);
    // Open it
    cy.get('[data-cy=whatsapp-button]').click();

    cy.get('[data-cy=ws-click-handler]').should('have.css', 'display')
    .and('match', /block/);
    cy.get('[data-cy=ws-list-component]').should('have.css', 'display')
      .and('match', /flex/);
    
    cy.get('[data-cy=ws-click-handler]').should('have.css', 'display')
      .and('match', /block/);
    cy.get('[data-cy=ws-click-handler]').click();

    cy.get('[data-cy=ws-click-handler]').should('have.css', 'display')
      .and('match', /none/);
    cy.get('[data-cy=ws-list-component]').should('have.css', 'opacity')
      .and('match', /0/);
  });
});