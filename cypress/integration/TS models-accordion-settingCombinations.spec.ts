import SettingCombinationAccordion from '../support/pages/settingCombinations';
import { Profile } from '../../projects/gaming-models-components/src/lib/models/profile.model';
import { LevelFieldState } from '../support/pages/models/settingCombination.model';


describe('SettingCombination', () => {

  it('CRUD setting combination', () => {

    cy.fixture('progressiveSettings').then(progressiveSettings => {
      cy.stubProgressiveSettings(progressiveSettings.modelProgressiveSettings);
    });
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations);
    });

    const settingCombination = new SettingCombinationAccordion();
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
      releaseDate: '2019-03-19',
    };
    const secondCombinationLevelNamesInSequence: string[] = ['Grand', 'Major', 'Minor', 'Mini'];


    cy.stubSettingCombinations([]);
    cy.visitPage(profile);
    // create the first combination
    cy.route('POST', `/data/modelSpecification/${profile.specificationNumber}/settingCombination`, {
      message: 'Successfully created a new setting combination',
      modelSettingCombinations: [{
        '__v': 0,
        'updatedAt': '2019-03-18T02:55:13.682Z',
        'createdAt': '2019-03-18T02:55:13.682Z',
        'combinationNumber': 7,
        'jackpotTheme': '123',
        'key': '5d09c04aad9a68734318f13d',
        'status': 'active',
        'totalPRTP': '282946.000000',
        '_id': '5c8f089165e69c4e0dad5a07',
        'specificationNumber': '1.0000A',
        'inActiveVersions': [],
        'combinationLevels': [
          {
            'incrementPercentage': 23,
            'totalPercentage': 282946,
            'maximumAmount': 1234,
            'startupAmount': 123,
            'progressiveSettingNumber': 2,
            'progressiveSettingJackpotType': 'standard',
            'levelName': 'Mini',
            'level': 1
          }
        ],
        'variations': []
      }]
    }).as('createSettingCombination');
    settingCombination.expandStandaloneProgressivesAccordion();
    settingCombination.expandSettingCombinationAccordion();
    settingCombination.addNewSettingCombination([1]);
    settingCombination.verifyAddSettingCombinationButtonIsDisabled();
    settingCombination.fillInJackpotTheme(1, 'Testing123');
    settingCombination.verifyLevelNamesInSequence(1, ['Mini']);
    settingCombination.verifyCreateSettingCombinationIsCalledWith(1);
    // Update the combination
    settingCombination.addProgressiveSettingFromExistingCombinationSetting(1, [2, 3, 4]);
    settingCombination.verifyUpdateSettingCombinationIsCalledWith(4);
    settingCombination.verifyLevelNamesInSequence(1, secondCombinationLevelNamesInSequence);
    // Delete the combination
    settingCombination.deleteSettingCombination(1);
    settingCombination.verifyDeleteSettingCombinationIsCalledWith(1);
    settingCombination.verifyHeadingCount(0);
  });

  it('Pagination in combination', () => {

    cy.fixture('progressiveSettings').then(progressiveSettings => {
      cy.stubProgressiveSettings(progressiveSettings.modelProgressiveSettings);
    });
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations);
    });

    const settingCombination = new SettingCombinationAccordion();
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
      releaseDate: '2019-03-19',
    };
    cy.route(`/data/modelSpecification/${profile.specificationNumber}/settingCombination/count`, {
      message: 'Successfully found model setting combination',
      maxSettingNumber: 5,
      totalSettingCombination: 5
    });
    cy.fixture('settingCombinations').then(settingCombinations => {
      cy.route(`/data/modelSpecification/${profile.specificationNumber}/settingCombination?startrow=1&endrow=3`, {
        message: 'Successfully found setting combination',
        modelSettingCombinations: settingCombinations.modelSettingCombinations_page_1
      });

      cy.route(`/data/modelSpecification/${profile.specificationNumber}/settingCombination?startrow=4&endrow=6`, {
        message: 'Successfully found new setting combination',
        modelSettingCombinations: settingCombinations.modelSettingCombinations_page_2
      });
    });

    cy.visitPage(profile);
    settingCombination.expandStandaloneProgressivesAccordion();
    settingCombination.expandSettingCombinationAccordion();
    settingCombination.verifySettingCombinationNumber([1, 2, 3]);
    settingCombination.nextSettingCombinationPage();
    settingCombination.verifySettingCombinationNumber([4, 5]);
    settingCombination.addNewSettingCombination([1]);
    settingCombination.fillInJackpotTheme(3, 'Testing123');
    settingCombination.verifySettingCombinationNumber([4, 5, 6]);
  });

  it.only('Validations', () => {

    cy.fixture('progressiveSettings').then(progressiveSettings => {
      cy.stubProgressiveSettings(progressiveSettings.modelProgressiveSettings);
    });
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations);
    });

    const settingCombination = new SettingCombinationAccordion();
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
      releaseDate: '2019-03-19',
    };
    cy.visitPage(profile);
    settingCombination.expandStandaloneProgressivesAccordion();
    settingCombination.expandSettingCombinationAccordion();
    settingCombination.addNewSettingCombination([1, 2, 3, 4]);
    // Verify duplication validation
    settingCombination.bulkUpdateLevelNames(1, [null, 'ABC', 'ABC', 'ABC']);
    const expectedFieldState1: LevelFieldState[] = [
      {levelName: 'normal'},
      {levelName: 'invalid'},
      {levelName: 'invalid'},
      {levelName: 'invalid'}
    ];
    expectedFieldState1.forEach((val, ind) => {
      settingCombination.verifyLevelFieldStates(1, ind + 1, val);
    });
    // Verify if it can back to normal
    settingCombination.bulkUpdateLevelNames(1, [null, 'XYZ', 'ABC', 'OPQ']);
    const expectedFieldState2: LevelFieldState[] = [
      {levelName: 'normal'},
      {levelName: 'normal'},
      {levelName: 'normal'},
      {levelName: 'normal'}
    ];
    expectedFieldState2.forEach((val, ind) => {
      settingCombination.verifyLevelFieldStates(1, ind + 1, val);
    });
  });

  it('Mapping variations', () => {
    cy.fixture('progressiveSettings').then(progressiveSettings => {
      cy.stubProgressiveSettings(progressiveSettings.modelProgressiveSettings);
    });
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations_for_SettingCombinations);
      cy.route('/data/modelSpecification/*/variation?*', {
        message: 'Successfully found model variations',
        modelVariations: variations.modelVariations_for_SettingCombinations,
        totalVariations: variations.modelVariations_for_SettingCombinations.length
      });
    });
    cy.stubSettingCombinations([]);
    const settingCombination = new SettingCombinationAccordion();
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
      releaseDate: '2019-03-19',
      pidc: 'test'
    };

    cy.fixture('settingCombinations').then(settingCombinations => {
      cy.route('POST', '/data/modelSpecification/*/settingCombination', {
        message: 'Successfully found setting combination mappings', modelSettingCombinationMappings: settingCombinations.variationMapping, totalModelSettingCombinationMappings: 1
      }).as('createSettingCombination');
      cy.route('POST', '/data/modelSpecification/*/versions/*/mappings/settingCombinations/*', {
        message: 'Successfully created new model setting combination mappings',
        modelSettingCombinationMappings: [
          {
            specificationNumber: profile.pidc,
            pidc: profile.pidc,
            settingCombinationKey: settingCombinations.variationMapping[0].key,
            variationNumber: 1
          }
        ],
        totalModelSettingCombinationMappings: 1
      }).as('createVariationMapping');
      cy.route('POST', '/data/mappings/settingCombinations', {
        message: 'Successfully found setting combination mappings', modelSettingCombinationMappings: [
          {
            createdAt: '2019-06-24T04:37:01.230Z',
            specificationNumber: profile.pidc,
            pidc: profile.pidc,
            settingCombinationKey: settingCombinations.variationMapping[0].key,
            variationNumber: 1,
            __v: 0,
            _id: '5d10536de8970b5e47a8e7be'
          }
        ],
        totalModelSettingCombinationMappings: 1
      }).as('getVariationMapping');
    });

    cy.visitPage(profile);
    settingCombination.expandStandaloneProgressivesAccordion();
    settingCombination.expandSettingCombinationAccordion();
    settingCombination.addNewSettingCombination([1, 2]);
    settingCombination.fillInJackpotTheme(1, 'Testing123');
    settingCombination.mapVariation(1, [1]);
    cy.wait('@createVariationMapping')
    .its('requestBody')
    .then((body: Cypress.ObjectLike) => {
      expect(body.variations.length).to.equal(2);
      expect(body.variations[0]).to.equal(99);
      expect(body.variations[1]).to.equal(1);
    });
  });
});
