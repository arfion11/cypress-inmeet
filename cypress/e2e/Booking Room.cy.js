///<reference types="cypress" />

describe('Booking Room Add Tests', () => {
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

  it('TC015 - check field NIP selain number ', () => {
    cy.visit('https://mris-staging.transtrack.id/booking-appointments');
    cy.url().should('include', '/booking-appointments');
    cy.get('#addBookingButton').click();

    const employeeNames = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Robert Brown',
      'Michael Williams',
      'Sarah Davis',
      'David Martinez',
      'Emily Garcia',
      'James Taylor',
      'Linda Anderson'
    ];

    const memberNames = [
      'Jake', 'Sarah', 'Grace', 'Tom', 'Emily', 'John', 'Lucas', 'Olivia', 'Sophia', 'James'
    ];

    const generateRandomNIP = () => {
      let nip = '';
      for (let i = 0; i < 8; i++) {
        nip += Math.floor(Math.random() * 10); // Menambahkan angka acak ke NIP
      }
      return nip;
    };

    const randomName = employeeNames[Math.floor(Math.random() * employeeNames.length)];
    const randomMembers = [];
    for (let i = 0; i < 3; i++) {
      const randomMember = memberNames[Math.floor(Math.random() * memberNames.length)];
      if (!randomMembers.includes(randomMember)) {
        randomMembers.push(randomMember); // Ensure no duplicates in the random member selection
      }
    }
    const randomNIP = generateRandomNIP();

    cy.get('#employeeName')
      .should('be.visible')
      .type(randomName)
      .should('have.value', randomName);

    cy.get('#employeeNumber')
      .should('be.visible')
      .type(randomNIP)
      .should('have.value', randomNIP);
  });

  it('TC028 - check dropdown office name', () => {
    cy.visit('https://mris-staging.transtrack.id/booking-appointments');
    cy.url().should('include', '/booking-appointments');
    cy.get('#addBookingButton').click();

    const employeeNames = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Robert Brown',
      'Michael Williams',
      'Sarah Davis',
      'David Martinez',
      'Emily Garcia',
      'James Taylor',
      'Linda Anderson'
    ];

    const memberNames = [
      'Jake', 'Sarah', 'Grace', 'Tom', 'Emily', 'John', 'Lucas', 'Olivia', 'Sophia', 'James'
    ];

    const generateRandomNIP = () => {
      let nip = '';
      for (let i = 0; i < 8; i++) {
        nip += Math.floor(Math.random() * 10); 
      }
      return nip;
    };

    const randomName = employeeNames[Math.floor(Math.random() * employeeNames.length)];
    const randomMembers = [];
    for (let i = 0; i < 3; i++) {
      const randomMember = memberNames[Math.floor(Math.random() * memberNames.length)];
      if (!randomMembers.includes(randomMember)) {
        randomMembers.push(randomMember); 
      }
    }
    const randomNIP = generateRandomNIP();

    cy.get('#employeeName')
      .should('be.visible')
      .type(randomName)
      .should('have.value', randomName);

    cy.get('#employeeNumber')
      .should('be.visible')
      .type(randomNIP)
      .should('have.value', randomNIP);

    cy.get('#office')
      .find('option')
      .not(':first')  
      .then(options => {
        const randomIndex = Math.floor(Math.random() * options.length);

        cy.get('#office')
          .select(options[randomIndex].innerText)  
          .should('have.value', options[randomIndex].value);  
});
});

it('TC017 - check dropdown room name', () => {
  cy.visit('https://mris-staging.transtrack.id/booking-appointments');
  cy.url().should('include', '/booking-appointments');
  cy.get('#addBookingButton').click();

  const employeeNames = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Robert Brown',
    'Michael Williams',
    'Sarah Davis',
    'David Martinez',
    'Emily Garcia',
    'James Taylor',
    'Linda Anderson'
  ];

  const memberNames = [
    'Jake', 'Sarah', 'Grace', 'Tom', 'Emily', 'John', 'Lucas', 'Olivia', 'Sophia', 'James'
  ];

  const generateRandomNIP = () => {
    let nip = '';
    for (let i = 0; i < 8; i++) {
      nip += Math.floor(Math.random() * 10); 
    }
    return nip;
  };

  const randomName = employeeNames[Math.floor(Math.random() * employeeNames.length)];
  const randomMembers = [];
  for (let i = 0; i < 3; i++) {
    const randomMember = memberNames[Math.floor(Math.random() * memberNames.length)];
    if (!randomMembers.includes(randomMember)) {
      randomMembers.push(randomMember); 
    }
  }
  const randomNIP = generateRandomNIP();

  cy.get('#employeeName')
    .should('be.visible')
    .type(randomName)
    .should('have.value', randomName);

  cy.get('#employeeNumber')
    .should('be.visible')
    .type(randomNIP)
    .should('have.value', randomNIP);

  cy.get('#office')
    .find('option')
    .not(':first')  
    .then(options => {
      const randomIndex = Math.floor(Math.random() * options.length);

      cy.get('#office')
        .select(options[randomIndex].innerText)  
        .should('have.value', options[randomIndex].value);  

      cy.get('#roomName')
        .should('be.visible')
        .find('option')
        .should('have.length.greaterThan', 1);  

      cy.get('#roomName')
        .find('option')
        .then(options => {
          const availableRooms = Array.from(options).map(option => option.value);  
          const selectedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];

          cy.get('#roomName')
            .select(selectedRoom)
            .should('have.value', selectedRoom);  
        });

});
});

it('TC018 - check room data name berdasarkan office yang dipilih ', () => {
  cy.visit('https://mris-staging.transtrack.id/booking-appointments');
  cy.url().should('include', '/booking-appointments');
  cy.get('#addBookingButton').click();

  const employeeNames = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Robert Brown',
    'Michael Williams',
    'Sarah Davis',
    'David Martinez',
    'Emily Garcia',
    'James Taylor',
    'Linda Anderson'
  ];

  const memberNames = [
    'Jake', 'Sarah', 'Grace', 'Tom', 'Emily', 'John', 'Lucas', 'Olivia', 'Sophia', 'James'
  ];

  const generateRandomNIP = () => {
    let nip = '';
    for (let i = 0; i < 8; i++) {
      nip += Math.floor(Math.random() * 10); 
    }
    return nip;
  };

  const randomName = employeeNames[Math.floor(Math.random() * employeeNames.length)];
  const randomMembers = [];
  for (let i = 0; i < 3; i++) {
    const randomMember = memberNames[Math.floor(Math.random() * memberNames.length)];
    if (!randomMembers.includes(randomMember)) {
      randomMembers.push(randomMember); 
    }
  }
  const randomNIP = generateRandomNIP();

  cy.get('#employeeName')
    .should('be.visible')
    .type(randomName)
    .should('have.value', randomName);

  cy.get('#employeeNumber')
    .should('be.visible')
    .type(randomNIP)
    .should('have.value', randomNIP);

  cy.get('#office')
    .find('option')
    .not(':first')  
    .then(options => {
      const randomIndex = Math.floor(Math.random() * options.length);

      cy.get('#office')
        .select(options[randomIndex].innerText)  
        .should('have.value', options[randomIndex].value);  

      cy.get('#roomName')
        .should('be.visible')
        .find('option')
        .should('have.length.greaterThan', 1);  

      cy.get('#roomName')
        .find('option')
        .then(options => {
          const availableRooms = Array.from(options).map(option => option.value);  
          const selectedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];

          cy.get('#roomName')
            .select(selectedRoom)
            .should('have.value', selectedRoom);  
        });

});
});

it('TC022 - check input members name ', () => {
  cy.visit('https://mris-staging.transtrack.id/booking-appointments');
  cy.url().should('include', '/booking-appointments');
  cy.get('#addBookingButton').click();

  const employeeNames = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Robert Brown',
    'Michael Williams',
    'Sarah Davis',
    'David Martinez',
    'Emily Garcia',
    'James Taylor',
    'Linda Anderson'
  ];

  const memberNames = [
    'Jake', 'Sarah', 'Grace', 'Tom', 'Emily', 'John', 'Lucas', 'Olivia', 'Sophia', 'James'
  ];

  const generateRandomNIP = () => {
    let nip = '';
    for (let i = 0; i < 8; i++) {
      nip += Math.floor(Math.random() * 10); 
    }
    return nip;
  };

  const randomName = employeeNames[Math.floor(Math.random() * employeeNames.length)];
  const randomMembers = [];
  for (let i = 0; i < 3; i++) {
    const randomMember = memberNames[Math.floor(Math.random() * memberNames.length)];
    if (!randomMembers.includes(randomMember)) {
      randomMembers.push(randomMember); 
    }
  }
  const randomNIP = generateRandomNIP();

  cy.get('#employeeName')
    .should('be.visible')
    .type(randomName)
    .should('have.value', randomName);

  cy.get('#employeeNumber')
    .should('be.visible')
    .type(randomNIP)
    .should('have.value', randomNIP);

  cy.get('#office')
    .find('option')
    .not(':first')  
    .then(options => {
      const randomIndex = Math.floor(Math.random() * options.length);

      cy.get('#office')
        .select(options[randomIndex].innerText)  
        .should('have.value', options[randomIndex].value);  

      cy.get('#roomName')
        .should('be.visible')
        .find('option')
        .should('have.length.greaterThan', 1);  

      cy.get('#roomName')
        .find('option')
        .then(options => {
          const availableRooms = Array.from(options).map(option => option.value);  // Get room values
          const selectedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];

          cy.get('#roomName')
            .select(selectedRoom)
            .should('have.value', selectedRoom);  
        });

      const today = new Date();
      const todayString = today.toISOString().split('T')[0];  
      const todayDate = today.getDate();  

      cy.get('#date')
        .click();
      cy.wait(500); 
      cy.contains('.flatpickr-day', todayDate)
        .click({ force: true });  
      cy.get('#date')
        .should('have.value', todayString);  

      cy.get('#startTimePicker').click();  
      cy.get('#endTimePicker').click(); 

      const memberString = randomMembers.join(', '); 
      cy.get('#member')
        .should('be.visible')  
        .type(memberString)  
        .should('have.value', memberString);    
    });
  });
  it('TC028 - Add booking rooms', () => {
    cy.visit('https://mris-staging.transtrack.id/booking-appointments');
    cy.url().should('include', '/booking-appointments');
    cy.get('#addBookingButton').click();

    const employeeNames = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Robert Brown',
      'Michael Williams',
      'Sarah Davis',
      'David Martinez',
      'Emily Garcia',
      'James Taylor',
      'Linda Anderson'
    ];

    const memberNames = [
      'Jake', 'Sarah', 'Grace', 'Tom', 'Emily', 'John', 'Lucas', 'Olivia', 'Sophia', 'James'
    ];

    const generateRandomNIP = () => {
      let nip = '';
      for (let i = 0; i < 8; i++) {
        nip += Math.floor(Math.random() * 10); 
      }
      return nip;
    };

    const randomName = employeeNames[Math.floor(Math.random() * employeeNames.length)];
    const randomMembers = [];
    for (let i = 0; i < 3; i++) {
      const randomMember = memberNames[Math.floor(Math.random() * memberNames.length)];
      if (!randomMembers.includes(randomMember)) {
        randomMembers.push(randomMember); 
      }
    }
    const randomNIP = generateRandomNIP();

    cy.get('#employeeName')
      .should('be.visible')
      .type(randomName)
      .should('have.value', randomName);

    cy.get('#employeeNumber')
      .should('be.visible')
      .type(randomNIP)
      .should('have.value', randomNIP);

    cy.get('#office')
      .find('option')
      .not(':first')  
      .then(options => {
        const randomIndex = Math.floor(Math.random() * options.length);

        cy.get('#office')
          .select(options[randomIndex].innerText)  
          .should('have.value', options[randomIndex].value);  

        cy.get('#roomName')
          .should('be.visible')
          .find('option')
          .should('have.length.greaterThan', 1);  

        cy.get('#roomName')
          .find('option')
          .then(options => {
            const availableRooms = Array.from(options).map(option => option.value);  // Get room values
            const selectedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];

            cy.get('#roomName')
              .select(selectedRoom)
              .should('have.value', selectedRoom);  
          });

        const today = new Date();
        const todayString = today.toISOString().split('T')[0];  
        const todayDate = today.getDate();  

        cy.get('#date')
          .click();
        cy.wait(500); 
        cy.contains('.flatpickr-day', todayDate)
          .click({ force: true });  
        cy.get('#date')
          .should('have.value', todayString);  

        cy.get('#startTimePicker').click();  
        cy.get('#endTimePicker').click(); 

        const memberString = randomMembers.join(', '); 
        cy.get('#member')
          .should('be.visible')  
          .type(memberString)  
          .should('have.value', memberString);  

        const objectives = [
          'Sprint Planning',
          'Project Kickoff',
          'Team Meeting',
          'Code Review',
          'Retrospective Meeting',
          'Customer Feedback Session',
          'Sprint Retrospective',
          'Product Roadmap Planning'
        ];

        const randomObjective = objectives[Math.floor(Math.random() * objectives.length)];
        cy.get('#objective')
          .should('be.visible') 
          .type(randomObjective)  
          .should('have.value', randomObjective);

        cy.get('#storeBookingAppointmentButton')
          .should('be.visible')  
          .click(); 
      });
});
});
