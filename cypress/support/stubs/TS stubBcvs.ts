Cypress.Commands.add('stubBcvs', (bcvs) => {
    // tslint:disable-next-line:forin
    for (const key in bcvs) {
      cy.route('/data/modelSpecification/*/variation/' + key + '/bcv', {
          message: 'Successfully found model bcvs',
          modelBcvs: bcvs[key]
      });
    }
});
