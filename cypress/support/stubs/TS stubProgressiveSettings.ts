Cypress.Commands.add('stubProgressiveSettings', (progressiveSettings) => {
    cy.server();
  
    cy.route('POST', '/data/modelSpecification/*/progressiveSetting', {
      message: 'Successfully created a new model progressive setting',
      modelProgressiveSettings: progressiveSettings[0]
    });
  
    cy.route('/data/modelSpecification/*/progressiveSetting', {
      message: 'Successfully found model progressive settings',
      modelProgressiveSettings: progressiveSettings
    });
  
    cy.route('PUT', '/data/modelSpecification/*/progressiveSetting/all', {
      message: 'Bulk updated progressive settings',
      result: {
        error: [],
        success: [{
            message: 'Successfully updated model progressive setting',
            modelProgressiveSettings: [progressiveSettings[0]]
          },
          {
            message: 'Successfully updated model progressive setting',
            modelProgressiveSettings: [progressiveSettings[1]]
        }]
      }
    });
  
    cy.route('/data/modelSpecification/*/progressiveSettings/count', {
      message: 'Successfully found model progressive settings',
      maxSettingNumber: progressiveSettings.length,
      totalProgressiveSettings: progressiveSettings.length,
      activeProgressiveSettings: progressiveSettings.length
    });
  
    cy.route('/data/modelSpecification/*/progressiveSetting?*', {
      message: 'Successfully found model progressive settings',
      modelProgressiveSettings: progressiveSettings,
      totalProgressiveSettings: progressiveSettings.length
    });
  });
  