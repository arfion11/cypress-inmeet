///<reference types="cypress" />

describe('Login Page Validation Tests', () => {
  const baseUrl = 'https://mris-staging.transtrack.id/';

  beforeEach(() => {
    cy.visit(baseUrl); 
  });

  it('Should add a new user after login', () => {
    cy.get('#emailOrUsername').type('admin');
    cy.get('#password').type('Admin123');
    cy.get('button[type="submit"]').click();
  });
});
