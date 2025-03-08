///<reference types="cypress" />

describe('Office Add and Edit Tests', () => {
    const baseUrl = 'https://mris-staging.transtrack.id/';
  
    beforeEach(() => {
      cy.session('userSession', () => {
        cy.visit(baseUrl);
        cy.get('#emailOrUsername').type('admin'); 
        cy.get('#password').type('Admin123');    
        cy.get('#remember').check();
        cy.get('button[type="submit"]').click();
        cy.visit('https://mris-staging.transtrack.id/offices');
      });
    });
  
    it('dashboard offices', () => {
      cy.url().should('include', '/offices');  
    });
  });
  