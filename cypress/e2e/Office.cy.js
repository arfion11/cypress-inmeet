///<reference types="cypress" />

describe('Office Add Tests', () => {
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
      it('Input add office valid', () => {
        cy.visit('https://mris-staging.transtrack.id/offices');
        cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#office_name').should('be.visible');
    cy.get('#office_name').clear().type('TransTRACK');
    cy.get('#region').should('be.visible');
    const randomRegion = ['Malaysia', 'Singapore', 'Indonesia', 'Australia', 'Philippines'];
    cy.get('#region').clear().type(randomRegion[Math.floor(Math.random() * randomRegion.length)]);
    cy.get('#address').should('be.visible');
    const randomAddress = [
      'Jl. Emong No.24, Burangrang, Kota Bandung, Jawa Barat',
      '123 Elm St, Springfield, IL 62701, United States',
      '10 Downing St, London SW1A 2AA, United Kingdom',
      '221B Baker St, London NW1 6XE, United Kingdom',
      '1600 Pennsylvania Ave NW, Washington, DC 20500, United States'
    ];
    cy.get('#address').clear().type(randomAddress[Math.floor(Math.random() * randomAddress.length)]);
        cy.get('button[wire\\:click="store"]').click();
      });

      it('check validasi office name tidak terisi', () => {
        cy.visit('https://mris-staging.transtrack.id/offices');
        cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#office_name').should('be.visible');
    cy.get('#office_name').clear();
    cy.get('#region').should('be.visible');
    const randomRegion = ['Malaysia', 'Singapore', 'Indonesia', 'Australia', 'Philippines'];
    cy.get('#region').clear().type(randomRegion[Math.floor(Math.random() * randomRegion.length)]);
    cy.get('#address').should('be.visible');
    const randomAddress = [
      'Jl. Emong No.24, Burangrang, Kota Bandung, Jawa Barat',
      '123 Elm St, Springfield, IL 62701, United States',
      '10 Downing St, London SW1A 2AA, United Kingdom',
      '221B Baker St, London NW1 6XE, United Kingdom',
      '1600 Pennsylvania Ave NW, Washington, DC 20500, United States'
    ];
    cy.get('#address').clear().type(randomAddress[Math.floor(Math.random() * randomAddress.length)]);
        cy.get('button[wire\\:click="store"]').click();
        cy.contains('Office name is required.').should('be.visible');;
      });

      it('check validasi region tidak terisi', () => {
        cy.visit('https://mris-staging.transtrack.id/offices');
        cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#office_name').should('be.visible');
    cy.get('#office_name').clear().type('TransTRACK');
    cy.get('#region').should('be.visible');
    const randomRegion = ['Malaysia', 'Singapore', 'Indonesia', 'Australia', 'Philippines'];
    cy.get('#region').clear()
    cy.get('#address').should('be.visible');
    const randomAddress = [
      'Jl. Emong No.24, Burangrang, Kota Bandung, Jawa Barat',
      '123 Elm St, Springfield, IL 62701, United States',
      '10 Downing St, London SW1A 2AA, United Kingdom',
      '221B Baker St, London NW1 6XE, United Kingdom',
      '1600 Pennsylvania Ave NW, Washington, DC 20500, United States'
    ];
    cy.get('#address').clear().type(randomAddress[Math.floor(Math.random() * randomAddress.length)]);
        cy.get('button[wire\\:click="store"]').click();
        cy.contains('Region is required.').should('be.visible');;
      });

      it('check validasi address tidak terisi', () => {
        cy.visit('https://mris-staging.transtrack.id/offices');
        cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#office_name').should('be.visible');
    cy.get('#office_name').clear().type('TransTRACK');
    cy.get('#region').should('be.visible');
    const randomRegion = ['Malaysia', 'Singapore', 'Indonesia', 'Australia', 'Philippines'];
    cy.get('#region').clear().type(randomRegion[Math.floor(Math.random() * randomRegion.length)]);
    cy.get('#address').should('be.visible');
    const randomAddress = [
      'Jl. Emong No.24, Burangrang, Kota Bandung, Jawa Barat',
      '123 Elm St, Springfield, IL 62701, United States',
      '10 Downing St, London SW1A 2AA, United Kingdom',
      '221B Baker St, London NW1 6XE, United Kingdom',
      '1600 Pennsylvania Ave NW, Washington, DC 20500, United States'
    ];
    cy.get('#address').clear();
        cy.get('button[wire\\:click="store"]').click();
        cy.contains('Address is required.').should('be.visible');;
      });

      it('Mencegah penambahan office duplikat', () => {
        cy.visit('https://mris-staging.transtrack.id/offices');
        cy.get('button[wire\\:click="openAddModal"]').click();
    cy.get('#office_name').should('be.visible');
    cy.get('#office_name').clear().type('TransTRACK');
    cy.get('#region').should('be.visible').type('Philippines');
    cy.get('#address').should('be.visible').type('221B Baker St, London NW1 6XE, United Kingdom');;
        cy.get('button[wire\\:click="store"]').click();
        cy.contains('The office name has already been taken.').should('be.visible');;
      });
  });
  
  describe('Office Edit Tests', () => {
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

    it('should edit office details successfully', () => {
        cy.visit('https://mris-staging.transtrack.id/offices');
        cy.get('button[wire\\:click="openEditModal(\'f88e56db-c8f3-4f94-8639-27a8c1f46c49\')"]').click(); 
      });
    });