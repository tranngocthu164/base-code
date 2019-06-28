import VariationAccordion from '../support/pages/variation';
import { Profile } from '../../projects/gaming-models-components/src/lib/models/profile.model';
import { Variation, VariationFieldState } from '../support/pages/models/variation.model';

describe('Variation accordion', () => {

  it('Checkboxes of variation accordion in version create page', () => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations);
    });

    const variationAccordion = new VariationAccordion();
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };
    cy.visitPage(profile);
    variationAccordion.expandVariationAccordion();
    variationAccordion.verifyActiveVariationIsPreselected();
    variationAccordion.checkAllVariationButton();
    variationAccordion.verifyEachVariationIsChecked();
    variationAccordion.uncheckAllVariationButton();
    variationAccordion.verifyEachVariationIsUnchecked();
    variationAccordion.checkVariation(2);
    variationAccordion.verifyAllVariationButtonIsMixed();

  });

  it('Checkboxes should not exist in pages other than version create', () => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations);
    });
    const profile1: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'version-edit',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };
    cy.visitPage(profile1);
    cy
    .get('#variation_title mat-checkbox')
    .should('not.exist');

    const profile2: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'spec-edit',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true,
      releaseDate: '2019-03-19'
    };
    cy.visitPage(profile2);
    cy
    .get('#variation_title mat-checkbox')
    .should('not.exist');
  });

  it('i-SAP legacy data in spec edit', () => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations_iSAP_legacy_mixed);
    });
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'spec-edit',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: true,
      pcAttach: true,
      releaseDate: '2019-03-19'
    };
    const variationAccordion = new VariationAccordion();
    const expectedRowState: VariationFieldState[] = [
      {
        state: 'enabled',
        minimumRTP: 'disabled',
        maximumRTP: 'disabled',
        minFeaturePRTP: 'disabled',
        maxFeaturePRTP: 'disabled',
        sapPRTP: 'disabled',
      },
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
      },
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
        },
    ];
    cy.visitPage(profile);
    variationAccordion.expandVariationAccordion();
    expectedRowState.forEach((val, ind) => {
      variationAccordion.verifyVariationFieldState(ind + 1, val);
    });
    variationAccordion.inputVariationRow(1, {status: 'inactive'});
    cy.wait('@updateVariation')
    .its('requestBody')
    .then((body: Cypress.ObjectLike) => {
      expect(body.status).to.equal('inactive');
    });
  });

  it('i-SAP legacy data in version edit', () => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations_iSAP_legacy_mixed);
    });
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'version-edit',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: true,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19',
      pidc: 'test'
    };
    const expectedRowState: VariationFieldState[] = [
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
      },
      {
        state: 'disabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
      },
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
        },
    ];
    const variationAccordion = new VariationAccordion();

    cy.visitPage(profile);
    variationAccordion.expandVariationAccordion();
    expectedRowState.forEach((val, ind) => {
      variationAccordion.verifyVariationFieldState(ind + 1, val);
    });
    variationAccordion.inputVariationRow(1, {status: 'inactive'});
    cy.wait('@updateVariation')
    .its('requestBody').then((body: Cypress.ObjectLike) => {
      expect(body.inActiveVersions[0]).to.equal('test');
    });
  });

  it('i-SAP fix legacy data and new record in version create', () => {
    let variationData: any[];

    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations_iSAP_legacy_mixed);
      variationData = variations.modelVariations_iSAP_legacy_mixed;
      cy.route(`/data/modelSpecification/variation/${variationData[2]._id}`, {
        message: 'Successfully found model variations',
        modelVariations: [variationData[2]]
      });
    });
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: true,
      pcAttach: false,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };
    cy.route('/data/modelSpecification/*/collection?*', {
      message: 'Successfully found model the temporary record',
      modelVariations: []
    }).as('getCollection');

    cy.route('POST', '/data/modelSpecification/*/collection', {
      message: 'Successfully created a new model temporary collection',
      modelVariations: []
    }).as('createCollection');

    const fixLegacyVariation: Variation = {
      minimumBasePRTP: 39.99,
      maximumBasePRTP: 40.01,
      minimumFeaturePRTP: 40,
      maximumFeaturePRTP: 40.02,
      sapPRTP: 10
    };

    const duplicateMinPRTP: Variation = {
      variationNumber: 3,
      bcv: [2],
      minimumBasePRTP: 40.00,
      maximumBasePRTP: 40.02,
      minimumFeaturePRTP: 39.99,
      maximumFeaturePRTP: 40.01,
      sapPRTP: 10
    };

    const variationAccordion = new VariationAccordion();

    cy.visitPage(profile);
    variationAccordion.expandVariationAccordion();
    variationAccordion.verifyVariationFieldState(2, {
      state: 'disabled',
      minimumRTP: 'disabled',
      maximumRTP: 'disabled',
      minFeaturePRTP: 'disabled',
      maxFeaturePRTP: 'disabled',
      sapPRTP: 'disabled',
    }, profile.pageType);
    variationAccordion.verifyVariationFieldState(3, {
      state: 'disabled',
      minimumRTP: 'highlight',
      maximumRTP: 'highlight',
      minFeaturePRTP: 'highlight',
      maxFeaturePRTP: 'highlight',
      sapPRTP: 'highlight',
    }, profile.pageType);
    variationAccordion.inputVariationRow(1, {minimumBasePRTP: 43});
    variationAccordion.verifyVariationFieldState(1, {
      state: 'disabled',
      minimumRTP: 'invalid',
      maximumRTP: 'highlight',
      minFeaturePRTP: 'highlight',
    }, profile.pageType);
    variationAccordion.uncheckVariation(1);
    variationAccordion.inputVariationRow(3, fixLegacyVariation);
    // Verify the update call
    cy.wait('@updateVariation')
    .its('requestBody')
    .then((body: Cypress.ObjectLike) => {
      expect(body.minimumRTP).to.equal(fixLegacyVariation.minimumBasePRTP);
      expect(body.maximumRTP).to.equal(fixLegacyVariation.maximumBasePRTP);
      expect(body.minFeaturePRTP).to.equal(fixLegacyVariation.minimumFeaturePRTP);
      expect(body.maxFeaturePRTP).to.equal(fixLegacyVariation.maximumFeaturePRTP);
      expect(body.sapPRTP).to.equal(fixLegacyVariation.sapPRTP);
    });
    // Verify the temp colection
    cy.wait('@createCollection')
    .its('requestBody')
    .then((body: Cypress.ObjectLike) => {
      expect(body.collectionData._id).to.equal(variationData[2]._id);
      expect(body.collectionData.specificationNumber).to.equal(variationData[2].specificationNumber);
      expect(body.collectionData.variationNumber).to.equal(variationData[2].variationNumber);
      expect(body.collectionData.minimumRTP).to.equal(variationData[2].minimumRTP);
      expect(body.collectionData.maximumRTP).to.equal(variationData[2].maximumRTP);
      expect(body.specificationNumber).to.equal(variationData[2].specificationNumber);
      expect(body.collectionName).to.equal('variations');
      expect(body.savedId).to.equal(variationData[2]._id);
    });

    cy.get('#addVariation')
    .should('have.attr', 'ng-reflect-disabled', 'false');

    // Verify unique Total PRTP
    variationAccordion.clickAddVariation();
    variationAccordion.verifyVariationFieldState(1, {state: 'disabled'}, profile.pageType);
    variationAccordion.inputVariationRow(4, duplicateMinPRTP);
    variationAccordion.verifyTotalMinPRTPInError(4, 'Total Min PRTP% must be unique');

    // Verify decimal caculation
    variationAccordion.inputVariationRow(4, {minimumBasePRTP: 40.01, minimumFeaturePRTP: 40});
    variationAccordion.verifyTotalMinPRTP(4, '90.01000');
    variationAccordion.verifyVariationFieldState(4, {state: 'enabled'}, profile.pageType);

  });

  it('SA legacy data in spec edit', () => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations_SA_legacy_mixed);
    });
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'spec-edit',
      readOnly: false,
      locked: false,
      classification: 'SA',
      subClassification: 'S95',
      legacy: true,
      pcAttach: true,
      releaseDate: '2019-03-19'
    };
    const expectedRowState: VariationFieldState[] = [
      {
        state: 'enabled',
        minimumRTP: 'disabled',
        maximumRTP: 'disabled',
        minFeaturePRTP: 'disabled',
        maxFeaturePRTP: 'disabled',
        sapPRTP: 'masked',
      },
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
      },
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
        },
    ];
    const variationAccordion = new VariationAccordion();

    cy.visitPage(profile);
    variationAccordion.expandVariationAccordion();
    expectedRowState.forEach((val, ind) => {
      variationAccordion.verifyVariationFieldState(ind + 1, val);
    });
    variationAccordion.inputVariationRow(1, {status: 'inactive'});
    cy.wait('@updateVariation')
    .its('requestBody')
    .then((body: Cypress.ObjectLike) => {
      expect(body.status).to.equal('inactive');
    });
  });

  it('SA legacy data in version edit', () => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations_SA_legacy_mixed);
    });
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'version-edit',
      readOnly: false,
      locked: false,
      classification: 'SA',
      subClassification: 'S95',
      legacy: true,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19',
      pidc: 'test'
    };
    const variationAccordion = new VariationAccordion();
    const expectedRowState: VariationFieldState[] = [
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
      },
      {
        state: 'disabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
      },
      {
        state: 'enabled',
        minimumRTP: 'masked',
        maximumRTP: 'masked',
        minFeaturePRTP: 'masked',
        maxFeaturePRTP: 'masked',
        sapPRTP: 'masked',
        },
    ];
    cy.visitPage(profile);
    variationAccordion.expandVariationAccordion();
    expectedRowState.forEach((val, ind) => {
      variationAccordion.verifyVariationFieldState(ind + 1, val);
    });
    variationAccordion.inputVariationRow(1, {status: 'inactive'});
    cy.wait('@updateVariation')
    .its('requestBody').then((body: Cypress.ObjectLike) => {
      expect(body.inActiveVersions[0]).to.equal('test');
    });
  });

  it('SA legacy data in version create', () => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations_SA_legacy_mixed);
    });
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.0000A',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'SA',
      subClassification: 'S95',
      legacy: true,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };
    const variationAccordion = new VariationAccordion();

    cy.visitPage(profile);
    variationAccordion.expandVariationAccordion();
    variationAccordion.verifyVariationFieldState(2, {
      state: 'disabled',
      minimumRTP: 'disabled',
      maximumRTP: 'disabled',
      minFeaturePRTP: 'disabled',
      maxFeaturePRTP: 'disabled',
      sapPRTP: 'masked',
    }, profile.pageType);
    variationAccordion.verifyVariationFieldState(3, {
      state: 'disabled',
      minimumRTP: 'highlight',
      maximumRTP: 'highlight',
      minFeaturePRTP: 'highlight',
      maxFeaturePRTP: 'highlight',
      sapPRTP: 'masked',
    }, profile.pageType);
    variationAccordion.inputVariationRow(1, {minimumBasePRTP: 43});
    variationAccordion.verifyVariationFieldState(1, {
      state: 'disabled',
      minimumRTP: 'invalid',
      maximumRTP: 'highlight',
      minFeaturePRTP: 'highlight',
      sapPRTP: 'masked',
    }, profile.pageType);

    variationAccordion.uncheckVariation(1);

    const fixLegacyVariation: Variation = {
      minimumBasePRTP: 39.99,
      maximumBasePRTP: 40.01,
      minimumFeaturePRTP: 40,
      maximumFeaturePRTP: 40.02,
    };
    variationAccordion.inputVariationRow(3, fixLegacyVariation);
    cy.wait('@updateVariation')
    .its('requestBody')
    .then((body: Cypress.ObjectLike) => {
      expect(body.minimumRTP).to.equal(fixLegacyVariation.minimumBasePRTP);
      expect(body.maximumRTP).to.equal(fixLegacyVariation.maximumBasePRTP);
      expect(body.minFeaturePRTP).to.equal(fixLegacyVariation.minimumFeaturePRTP);
      expect(body.maxFeaturePRTP).to.equal(fixLegacyVariation.maximumFeaturePRTP);
    });

    cy.get('#addVariation')
    .should('have.attr', 'ng-reflect-disabled', 'false');

    // Min and max validation
    variationAccordion.inputVariationRow(3, {minimumBasePRTP: 41});

    variationAccordion.verifyVariationFieldState(3, {
      state: 'disabled',
      minimumRTP: 'invalid',
      maximumRTP: 'invalid',
      minFeaturePRTP: 'invalid',
    }, profile.pageType);
    variationAccordion.verifyTotalMinPRTPInError(3, 'Sum of Min Base PRTP, Min Feat');
  });
});
