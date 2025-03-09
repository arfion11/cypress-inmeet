///<reference types="cypress" />

describe('Meeting Room Add Test', () => {
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
  
    it('Input meeting-rooms', () => {
        cy.visit('https://mris-staging.transtrack.id/meeting-rooms'); 
        cy.get('#AddMeetingRoomButton').should('be.visible') .click(); 
        cy.get('#roomName').should('be.visible');
        const mountainNames = ['Gunung Merapi', 'Gunung Bromo', 'Gunung Rinjani', 'Gunung Semeru', 'Gunung Kerinci', 
          'Gunung Arjuno', 'Gunung Gede', 'Gunung Pangrango', 'Gunung Salak', 'Gunung Sumbing'];
        const randomMountainName = mountainNames[Math.floor(Math.random() * mountainNames.length)];
        const roomName = `Room ${randomMountainName}`;
        cy.get('#roomName').clear().type(roomName);
        cy.get('#roomName').should('have.value', roomName)
        cy.get('#capacity').should('be.visible');
        const randomCapacity = Math.floor(Math.random() * 15) + 1; 
        cy.get('#capacity').clear().type(randomCapacity); 
        cy.get('#capacity').should('have.value', randomCapacity);
        cy.get('#selectedOffice').should('be.visible');
        const officeOptions = [
          'TransTRACK - Bandung',
          'TransTRACK - Jakarta',
          'TransTRACK - Madura',
          'TransTRACK - Malaysia',
          'TransTRACK - Philippines',
          'TransTRACK - Australia'
        ];
        const randomOffice = officeOptions[Math.floor(Math.random() * officeOptions.length)];
        cy.get('#selectedOffice').select(randomOffice);
        cy.get('button[wire\\:click="store"]')
        .should('be.visible')  
        .click();
    });

    it('check validasi name tidak terisi', () => {
      cy.visit('https://mris-staging.transtrack.id/meeting-rooms'); 
      cy.get('#AddMeetingRoomButton').should('be.visible').click(); 
      cy.get('#roomName').should('be.visible');
      cy.get('#roomName').clear();
      cy.get('#roomName').should('have.value', ''); 
      cy.get('#capacity').should('be.visible');
      const randomCapacity = Math.floor(Math.random() * 15) + 1; 
      cy.get('#capacity').clear().type(randomCapacity); 
      cy.get('#capacity').should('have.value', randomCapacity);
      cy.get('#selectedOffice').should('be.visible');
      const officeOptions = [
        'TransTRACK - Bandung',
        'TransTRACK - Jakarta',
        'TransTRACK - Madura',
        'TransTRACK - Malaysia',
        'TransTRACK - Philippines',
        'TransTRACK - Australia'
      ];
      const randomOffice = officeOptions[Math.floor(Math.random() * officeOptions.length)];
      cy.get('#selectedOffice').select(randomOffice);
      cy.get('button[wire\\:click="store"]')
        .should('be.visible')
        .click(); 
        cy.contains('The room name field is required.').should('be.visible');
  });
  
  it('check validasi capacity tidak terisi', () => {
    cy.visit('https://mris-staging.transtrack.id/meeting-rooms'); 
    cy.get('#AddMeetingRoomButton').should('be.visible').click(); 
    cy.get('#roomName').should('be.visible');
    const mountainNames = ['Gunung Merapi', 'Gunung Bromo', 'Gunung Rinjani', 'Gunung Semeru', 'Gunung Kerinci', 
      'Gunung Arjuno', 'Gunung Gede', 'Gunung Pangrango', 'Gunung Salak', 'Gunung Sumbing'];
    const randomMountainName = mountainNames[Math.floor(Math.random() * mountainNames.length)];
    const roomName = `Room ${randomMountainName}`;
    cy.get('#roomName').clear().type(roomName);
    cy.get('#roomName').should('have.value', roomName);
    cy.get('#capacity').clear();  
    cy.get('#capacity').should('have.value', '');  
    cy.get('#selectedOffice').should('be.visible');
    const officeOptions = [
      'TransTRACK - Bandung',
      'TransTRACK - Jakarta',
      'TransTRACK - Madura',
      'TransTRACK - Malaysia',
      'TransTRACK - Philippines',
      'TransTRACK - Australia'
    ];
    const randomOffice = officeOptions[Math.floor(Math.random() * officeOptions.length)];
    cy.get('#selectedOffice').select(randomOffice);
    cy.get('button[wire\\:click="store"]')
      .should('be.visible')
      .click();
      cy.contains('The capacity field is required.').should('be.visible'); 
});

it('check validasi office tidak terisi', () => {
  cy.visit('https://mris-staging.transtrack.id/meeting-rooms'); 
  cy.get('#AddMeetingRoomButton').should('be.visible').click(); 
  cy.get('#roomName').should('be.visible');
  const mountainNames = ['Gunung Merapi', 'Gunung Bromo', 'Gunung Rinjani', 'Gunung Semeru', 'Gunung Kerinci', 
    'Gunung Arjuno', 'Gunung Gede', 'Gunung Pangrango', 'Gunung Salak', 'Gunung Sumbing'];
  const randomMountainName = mountainNames[Math.floor(Math.random() * mountainNames.length)];
  const roomName = `Room ${randomMountainName}`;
  cy.get('#roomName').clear().type(roomName);
  cy.get('#roomName').should('have.value', roomName);
  cy.get('#capacity').clear();  
  const randomCapacity = Math.floor(Math.random() * 15) + 1;  
  cy.get('#capacity').type(randomCapacity);  
  cy.get('#capacity').should('have.value', randomCapacity);
  cy.get('button[wire\\:click="store"]')
    .should('be.visible')
    .click(); 
    cy.contains('The selected office field is required').should('be.visible'); 
});

it('Input meeting-rooms duplikat', () => {
  cy.visit('https://mris-staging.transtrack.id/meeting-rooms'); 
  cy.get('#AddMeetingRoomButton').should('be.visible') .click(); 
  cy.get('#roomName').should('be.visible');
  const mountainNames = ['Gunung Rinjani'];
  const randomMountainName = mountainNames[Math.floor(Math.random() * mountainNames.length)];
  const roomName = `Room ${randomMountainName}`;
  cy.get('#roomName').clear().type(roomName);
  cy.get('#roomName').should('have.value', roomName)
  cy.get('#capacity').should('be.visible');
  const randomCapacity = Math.floor(Math.random() * 15) + 1; 
  cy.get('#capacity').clear().type(randomCapacity); 
  cy.get('#capacity').should('have.value', randomCapacity);
  cy.get('#selectedOffice').should('be.visible');
  const officeOptions = [
    'TransTRACK - Jakarta',
  ];
  const randomOffice = officeOptions[Math.floor(Math.random() * officeOptions.length)];
  cy.get('#selectedOffice').select(randomOffice);
  cy.get('button[wire\\:click="store"]')
  .should('be.visible')  
  .click();
  cy.contains('The room name has already been taken.').should('be.visible'); 
});
  });

  describe('Meeting Room Edit Tests', () => {
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

    it('should edit office details successfully', () => { 
      cy.visit('https://mris-staging.transtrack.id/meeting-rooms');
      cy.get('button[wire\\:click="openEditModal(\'54a3e4d4-792f-41cc-9362-a69bf55a4fd5\')"]').click();  
  });
});