///<reference types="cypress" />

describe('User Page Add and Edit Tests', () => {
    const baseUrl = 'https://mris-staging.transtrack.id/';
  
    beforeEach(() => {
      cy.session('userSession', () => {
        cy.visit(baseUrl);
        cy.get('#emailOrUsername').type('admin'); 
        cy.get('#password').type('Admin123');    
        cy.get('#eyeIcon').click();
        cy.get('#remember').check();
        cy.get('button[type="submit"]').click();
        cy.visit('https://mris-staging.transtrack.id/users');
      });
    });
  
    it('dashboard users', () => {
      cy.url().should('include', '/users');  
    });
  });
  