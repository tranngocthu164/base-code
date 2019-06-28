Cypress.Commands.add('stubSettingCombinations', (settingCombinations) => {
    cy.server();
  
    cy.route('POST', '/data/modelSpecification/*/settingCombination', {
      message: 'Successfully created a new setting combination',
      modelSettingCombinations: []
    }).as('createSettingCombination');
  
    cy.route('/data/modelSpecification/*/settingCombination/count', {
      message: 'Successfully found model setting combination',
      maxSettingNumber: settingCombinations.length,
      totalSettingCombination: settingCombinations.length
    });
  
    cy.route('PUT', '/data/modelSpecification/settingCombination/*', {
      message: 'Successfully updated a new setting combination',
      modelSettingCombinations: {}
    }).as('updateSettingCombination');
  
    cy.route('DELETE', '/data/modelSpecification/*/settingCombination/*', {
      message: 'Successfully deleted a new setting combination',
      result: {}
    }).as('deleteSettingCombination');
  
    cy.route('/data/modelSpecification/*/settingCombination?*', {
      message: 'Successfully found model setting combination',
      modelSettingCombinations: settingCombinations,
      totalSettingCombinations: settingCombinations.length
    }).as('getSettingCombination');
  });
  