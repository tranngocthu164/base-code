Cypress.Commands.add('select', (select) => {
    cy
      .get(`#${select.fieldName}`)
      .click()
      .get('.cdk-overlay-container mat-option span')
      .contains(select.value)
      .click();
  });
  
  