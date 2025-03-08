///<reference types="cypress" />

describe('Meeting Room Add and Edit Test', () => {
    const baseUrl = 'https://mris-staging.transtrack.id/';
  
    beforeEach(() => {
      cy.session('userSession', () => {
        cy.visit(baseUrl);
        cy.get('#emailOrUsername').type('admin'); 
        cy.get('#password').type('Admin123');    
        cy.get('#remember').check();
        cy.get('button[type="submit"]').click();
        cy.visit('https://mris-staging.transtrack.id/meeting-rooms');
      });
    });
  
    it('dashboard meeting-rooms', () => {
      cy.url().should('include', '/meeting-rooms');  
    });
  });