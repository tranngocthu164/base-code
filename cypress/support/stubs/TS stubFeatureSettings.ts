Cypress.Commands.add('stubFeatureSettings',(featureSettings) => {
    cy.server();
  
    cy.route('POST', '/data/modelSpecification/*/featureSettings', {
      message: 'Successfully created a new feature setting',
      modelFeatureSettings: {}
    }).as('createFeatureSettings');
  
    cy.route('/data/modelSpecification/*/featureSettings/count', {
      message: 'Successfully found feature settings',
      totalFeatureSettings: featureSettings.length
    });
  
    cy.route('/data/modelSpecification/*/featureSettings?*', {
      message: 'Successfully found feature settings',
      modelFeatureSettings: featureSettings
    });
  });