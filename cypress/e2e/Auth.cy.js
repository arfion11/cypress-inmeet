///<reference types="cypress" />

describe('Login Page Validation Tests', () => {
  const baseUrl = 'https://mris-staging.transtrack.id/';

  beforeEach(() => {
    cy.visit(baseUrl); 
  });

  it('Invalid email', () => {
    cy.get('#emailOrUsername').type('invalid-email');
    cy.get('#password').type('Admin123');
    cy.get('button[type="submit"]').click();
    cy.contains('Email/Username does not exist.').should('be.visible');
  });

  it('Email not registered', () => {
    cy.get('#emailOrUsername').type('unregistered@example.com');
    cy.get('#password').type('Admin123');
    cy.get('#eyeIcon').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email! Please check your entry.').should('be.visible');
  });

  it('Incorrect password', () => {
    cy.get('#emailOrUsername').type('admin');
    cy.get('#password').type('WrongPassword123');
    cy.get('#eyeIcon').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Incorrect password!').should('be.visible');
  });

  it('Empty Email Field', () => {
    cy.get('#emailOrUsername').clear();
    cy.get('#password').type('Admin123');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Empty Password Field', () => {
    cy.get('#emailOrUsername').type('admin');
    cy.get('#password').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Successful Login', () => {
    cy.get('#emailOrUsername').type('admin');
    cy.get('#password').type('Admin123');
    cy.get('#eyeIcon').click();
    cy.get('#remember').check();
    cy.get('button[type="submit"]').click();
  });
});