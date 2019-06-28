Cypress.Commands.add('stubDealers', (dealers) => {
    cy.server()
    .route('/data/dealers', {
      message: 'Successfully found dealers list',
      dealers: dealers
    });
  
  });
  