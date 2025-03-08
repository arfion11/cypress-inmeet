///<reference types="cypress" />

describe('Booking Room Add and Edit Tests', () => {
    const baseUrl = 'https://mris-staging.transtrack.id/';
  
    beforeEach(() => {
      cy.session('userSession', () => {
        cy.visit(baseUrl);
        cy.get('#emailOrUsername').type('admin'); 
        cy.get('#password').type('Admin123');    
        cy.get('#remember').check();
        cy.get('button[type="submit"]').click();
        cy.visit('https://mris-staging.transtrack.id/booking-appointments');
      });
    });
  
    it('dashboard booking-appointments', () => {
      cy.url().should('include', '/booking-appointments');  
    });
  });