///<reference types="cypress" />

describe('User Page Add Tests', () => {
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
  it('TC010 - Input add office valid', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#email').should('be.visible');
    const randomNames = ['JohnDoe', 'JaneSmith', 'MichaelBrown', 'SarahWilson', 'DavidTaylor'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomEmail = `${randomName}${Math.floor(Math.random() * 100)}@transtrack.id`;
    cy.get('#email').clear().type(randomEmail);  
    cy.get('#email').should('have.value', randomEmail);
    const usernameFromEmail = randomEmail.split('@')[0]; 
    cy.get('#username').clear().type(usernameFromEmail);  
    cy.get('#username').should('have.value', usernameFromEmail);
    cy.get('#password').clear().type(usernameFromEmail); 
    cy.get('#eyeIconPassword').click();
    cy.get('button[wire\\:click="store"]')
    .should('be.visible')  
    .click(); 
  });

  it('TC012 - validasi invalid email', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#email').should('be.visible').clear();
    const randomNames = ['JohnDoe', 'JaneSmith', 'MichaelBrown', 'SarahWilson', 'DavidTaylor'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomEmail = `${randomName}${Math.floor(Math.random() * 100)}@gmail.com`;
    cy.get('#email').clear().type(randomEmail);  
    cy.get('#email').should('have.value', randomEmail);
    const usernameFromEmail = randomEmail.split('@')[0]; 
    cy.get('#username').clear().type(usernameFromEmail);  
    cy.get('#username').should('have.value', usernameFromEmail);
    cy.get('#password').clear().type(usernameFromEmail); 
    cy.get('#eyeIconPassword').click();
    cy.get('button[wire\\:click="store"]')
    .should('be.visible') 
    .click(); 
    cy.contains('Email must be a valid Transtrack email.').should('be.visible');;
  });

  it('TC013 - Validasi create password least 8 characters', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#email').should('be.visible');
    const randomNames = ['JohnDoe', 'JaneSmith', 'MichaelBrown', 'SarahWilson', 'DavidTaylor'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomEmail = `${randomName}${Math.floor(Math.random() * 100)}@transtrack.id`;
    cy.get('#email').clear().type(randomEmail);  
    cy.get('#email').should('have.value', randomEmail);
    let usernameFromEmail = randomEmail.split('@')[0]; 
    if (usernameFromEmail.length >= 8) {
        usernameFromEmail = usernameFromEmail.substring(0, 7);  
    }
    const password = usernameFromEmail.toLowerCase(); 
    cy.get('#username').clear().type(usernameFromEmail);  
    cy.get('#username').should('have.value', usernameFromEmail);
    cy.get('#password').clear().type(password); 
    cy.get('#password').should('have.value', password);
    cy.get('#eyeIconPassword').click();
    cy.get('button[wire\\:click="store"]')
      .should('be.visible')
      .click(); 
    cy.contains('Password must be at least 8 characters.').should('be.visible');;
});

it('TC013 - Validasi create password must contain at least one lowercase and one uppercase', () => {
  cy.visit('https://mris-staging.transtrack.id/users');
  cy.get('button[wire\\:click="openAddModal"]').click();
  cy.get('#email').should('be.visible');
  const randomNames = ['JohnDoe', 'JaneSmith', 'MichaelBrown', 'SarahWilson', 'DavidTaylor'];
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
  const randomEmail = `${randomName}${Math.floor(Math.random() * 100)}@transtrack.id`;
  cy.get('#email').clear().type(randomEmail);  
  cy.get('#email').should('have.value', randomEmail);
  let usernameFromEmail = randomEmail.split('@')[0]; 
  if (usernameFromEmail.length >= 8) {
      usernameFromEmail = usernameFromEmail.substring(0, 8);  
  }
  const password = usernameFromEmail.toLowerCase(); 
  cy.get('#username').clear().type(usernameFromEmail);  
  cy.get('#username').should('have.value', usernameFromEmail);
  cy.get('#password').clear().type(password); 
  cy.get('#password').should('have.value', password);
  cy.get('#eyeIconPassword').click();
  cy.get('button[wire\\:click="store"]')
    .should('be.visible')
    .click(); 
  cy.contains('Password must contain at least one lowercase and one uppercase letter.').should('be.visible');;
  });

  it('TC014 - Input add office valid with empty email field', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#email').should('be.visible');
    cy.get('#email').clear();  
    cy.get('#email').should('have.value', '');  
    const randomNames = ['JohnDoe', 'JaneSmith', 'MichaelBrown', 'SarahWilson', 'DavidTaylor'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const usernameFromEmail = randomName;  
    cy.get('#username').clear().type(usernameFromEmail);  
    cy.get('#username').should('have.value', usernameFromEmail);
    cy.get('#password').clear().type(usernameFromEmail); 
    cy.get('#eyeIconPassword').click();
    cy.get('button[wire\\:click="store"]')
      .should('be.visible')  
      .click();
      cy.contains('Email is required.').should('be.visible');
});
it('TC015 - Input add office valid with empty username field', () => {
  cy.visit('https://mris-staging.transtrack.id/users');
  cy.get('button[wire\\:click="openAddModal"]').click();
  cy.get('#email').should('be.visible');
  const randomNames = ['JohnDoe', 'JaneSmith', 'MichaelBrown', 'SarahWilson', 'DavidTaylor'];
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
  const randomEmail = `${randomName}${Math.floor(Math.random() * 100)}@transtrack.id`;
  cy.get('#email').clear().type(randomEmail);  
  cy.get('#email').should('have.value', randomEmail);
  cy.get('#username').clear();  
  cy.get('#password').clear().type(randomName); 
  cy.get('#eyeIconPassword').click();
  cy.get('button[wire\\:click="store"]')
    .should('be.visible')  
    .click();
    cy.contains('Username is required.').should('be.visible'); 
});

it('TC016 - Input add office valid with empty password field', () => {
  cy.visit('https://mris-staging.transtrack.id/users');
  cy.get('button[wire\\:click="openAddModal"]').click();
  cy.get('#email').should('be.visible');
  const randomNames = ['JohnDoe', 'JaneSmith', 'MichaelBrown', 'SarahWilson', 'DavidTaylor'];
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
  const randomEmail = `${randomName}${Math.floor(Math.random() * 100)}@transtrack.id`;
  cy.get('#email').clear().type(randomEmail);  
  cy.get('#email').should('have.value', randomEmail);
  const usernameFromEmail = randomEmail.split('@')[0]; 
  cy.get('#username').clear().type(usernameFromEmail);  
  cy.get('#username').should('have.value', usernameFromEmail);
  cy.get('#password').clear();
  cy.get('#password').should('have.value', '');  
  cy.get('#eyeIconPassword').click();
  cy.get('button[wire\\:click="store"]')
    .should('be.visible')  
    .click();  
    cy.contains('Password is required.').should('be.visible');
});

it('TC018 - Mencegah penambahan user duplikat', () => {
  cy.visit('https://mris-staging.transtrack.id/users');
  cy.get('button[wire\\:click="openAddModal"]').click();
  cy.get('#email').should('be.visible');
  cy.get('#email').clear().type('admin@transtrack.id	');  
  cy.get('#username').clear().type('admin');  
  cy.get('#password').clear().type('Admin123');
  cy.get('#eyeIconPassword').click();
  cy.get('button[wire\\:click="store"]')
    .should('be.visible')  
    .click();  
    cy.contains('The email has already been taken.').should('be.visible');
    cy.contains('The username has already been taken.').should('be.visible');
});
});

describe('User Page Edit Tests', () => {
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

  it('TC020 - Input edit user valid', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-email')
      .clear()
      .type('Arfion@transtrack.id');
    cy.get('#new-username')
      .clear()
      .type('Arfion'); 
    cy.get('#newPassword')
      .clear()
      .type('Arfion123');
    cy.get('#eyeIconNewPassword').click();
    cy.get('button[wire\\:click="update"]').click();
  });

  it('TC022 - Validasi invalid email', () => {
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
    cy.contains('Email must be a valid Transtrack email.')
  });

  it('TC024- check validasi email tidak terisi', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-email').clear();
    cy.get('#newPassword')
    .clear()
    .type('Arfion222');
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('Email is required.')
  });

  it('TC025 - check validasi username tidak terisi', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-username').should('be.visible');
    cy.get('#new-username').clear();
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('Username is required.')
  });

  it('TC023 - Input password user invalid', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#newPassword')
      .clear()
      .type('arfion123');
    cy.get('#eyeIconNewPassword').click();
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('Password must contain at least one lowercase and one uppercase letter.')
  });

  it('TC028 - Mencegah update user duplikat', () => {
    cy.visit('https://mris-staging.transtrack.id/users');
    cy.get('button[wire\\:click="openEditModal(\'a998c246-65c4-463b-b826-3e19899ff9b9\')"]').click();
    cy.get('#new-email')
      .clear()
      .type('MichaelBrown20@transtrack.id');
    cy.get('#new-username')
      .clear()
      .type('MichaelBrown20');  
    cy.get('#eyeIconNewPassword').click();
    cy.get('button[wire\\:click="update"]').click();
    cy.contains('The email has already been taken.')
  });
});
