beforeEach(() => {
    cy.server();
    cy.route('/data/masterList/national/availableEntity/LGNSW/item', 'fx:/masterList/national');
    cy.route('/data/masterList/national/item', 'fx:/masterList/national');
    cy.route('/data/masterList/appendix/availableEntity/LGNSW/item', 'fx:/masterList/appendix');
    cy.route('/data/masterList/appendix/item', 'fx:/masterList/appendix');
    cy.route('/data/masterList/protocol/availableEntity/LGNSW/item', 'fx:/masterList/protocol');
    cy.route('/data/masterList/protocol/item', 'fx:/masterList/protocol');
    cy.route('/data/masterList/jackpot/availableEntity/LGNSW/item', 'fx:/masterList/jackpot');
    cy.route('/data/masterList/jackpot/item', 'fx:/masterList/jackpot');
    cy.route('/data/masterList/tito/availableEntity/LGNSW/item', []);
    cy.route('/data/masterList/tito/item', []);
    cy.route('/data/masterList/bcv/item', 'fx:/masterList/bcv');
    cy.route('/data/masterList/versions/state', 'fx:/masterList/versionStates');
    cy.route('/data/masterList/platforms/availableEntity/*/item', 'fx:/masterList/platforms');
    cy.route('/data/masterList/item/*', 'fx:/masterList/platforms');
    cy.route('/data/masterList/featureType/item', 'fx:/masterList/features');
  
    cy.server().route('DELETE', '/data/modelSpecification/*/collection/revert?collectionName=ModelVersions', {
      message: 'Successfully reverted the orignal state'
    });
  });
  
  