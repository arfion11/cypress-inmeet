///<reference types="cypress" />

describe('User Page Edit Tests', () => {
  const baseUrl = 'https://mris-staging.transtrack.id/';

  beforeEach(() => {
    cy.session('userSession', () => {
      cy.visit(baseUrl);
      cy.get('#emailOrUsername').type('admin'); // Username yang valid
      cy.get('#password').type('Admin123');    // Password yang valid
      cy.get('#eyeIcon').click();
      cy.get('#remember').check();
      cy.get('button[type="submit"]').click();
      cy.visit('https://mris-staging.transtrack.id/users'); // Mengunjungi halaman users setelah login
    });
  });

  it('Input edit user valid', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-email')
      .clear()
      .type('Arfion@transtrack.id');
    cy.get('#new-username')
      .clear()
      .type('Arfion');  // Memasukkan username baru
    cy.get('#newPassword')
      .clear()
      .type('Arfion123');
    cy.get('#eyeIconNewPassword').click();
    cy.get('button[wire\\:click="update"]').click();
  });

  it('Validasi invalid email', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-email')
      .clear()
      .type('newemail@gmail.com');
    cy.get('#new-username')
      .clear()
      .type('Arfion');  
    cy.get('#newPassword')
      .clear()
      .type('Arfion123');
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('Email must be a valid Transtrack email.');
  });

  it('check validasi email tidak terisi', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-email').clear();
    cy.get('#newPassword')
    .clear()
    .type('Arfion222');
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('Email is required.') // Verifikasi pesan error untuk email
  });

  it('check validasi username tidak terisi', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-username').should('be.visible');
    cy.get('#new-username').clear();
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('Username is required.') // Verifikasi pesan error untuk username
  });

  it('Input edit user valid', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#newPassword')
      .clear()
      .type('arfion123');
    cy.get('#eyeIconNewPassword').click();
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('Password must contain at least one lowercase and one uppercase letter.') 
  });

  it('Mencegah update user duplikat', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-email')
      .clear()
      .type('hr@transtrack.id	');
    cy.get('#new-username')
      .clear()
      .type('HR');  
    cy.get('#eyeIconNewPassword').click();
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('The email has already been taken.') 
    cy.contains('The username has already been taken.') 
  });
});
