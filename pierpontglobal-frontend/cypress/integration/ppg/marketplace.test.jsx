
import ApplicationRoutes from '../../../src/constants/Routes';

describe('Marketplace page', () => {
  beforeEach(() => {
    cy.login('jhon', 'admin123');
  });

  it('Sample test with secure route renders it', () => {
    cy.visit(ApplicationRoutes.marketplace);
    cy.wait(1000);
  });

});