import FeaturesSettingAccordion from '../support/pages/features-featureSettings';
import { Profile } from '../../projects/gaming-models-components/src/lib/models/profile.model';

describe('Features setting sub-accordion inside Features accordion', () => {
  beforeEach(() => {
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations);
    });
    cy.fixture('featureSettings').then(featureSettings => {
      cy.stubFeatureSettings(featureSettings.modelFeatureSettings);
    });
  });

  it.skip('Mandatory field, and, min and max PRTP validations for a new feature', () => {
    const featureSettings = new FeaturesSettingAccordion();
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.AA321',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true, versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };
    const fieldNames = ['featureName', 'featureType', 'featureLimit', 'minimumPRPTPercentage', 'maximumPRPTPercentage'];

    cy.route('/data/modelSpecification/*/featureSettings?*', {
      message: 'No feature settings found',
      modelFeatureSettings: []
    });

    cy.visitPage(profile);
    featureSettings.expandFeaturesAccordion();
    featureSettings.expandFeatureSettingsAccordion();
    featureSettings.clickAddFeatureAndVerifyFeildCount();
    featureSettings.validateMandatoryFields(fieldNames);
    featureSettings.validateMinCantBeLessThanMaxPRTP();
  });

  it('delete feature from feature accordion', () => {
    const featureSettings = new FeaturesSettingAccordion();
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.RTRTT',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'MTGM',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };

    cy.visitPage(profile);
    featureSettings.expandFeaturesAccordion();
    featureSettings.expandFeatureSettingsAccordion();
    featureSettings.deleteFeatureByFeatureName('Feature Setting 2');
  });

  it('Feature Limit field validations for a feature', () => {
    const featureSettings = new FeaturesSettingAccordion();
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.ABCDC',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'MTGM',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };

    cy.visitPage(profile);
    featureSettings.expandFeaturesAccordion();
    featureSettings.expandFeatureSettingsAccordion();
    featureSettings.selectFeatureType('NoLimits', true);
    featureSettings.individualValidationsForFeatureLimit('0');
    featureSettings.individualValidationsForFeatureLimit('100');
    featureSettings.selectFeatureType('AllLimits', true);
    featureSettings.individualValidationsForFeatureLimit('8', 'Feature limit can only accept ');
    featureSettings.individualValidationsForFeatureLimit('30', 'Feature limit can only accept ');
    featureSettings.individualValidationsForFeatureLimit('15');
    featureSettings.selectFeatureType('NoMinLimit', true);
    featureSettings.individualValidationsForFeatureLimit('0');
    featureSettings.individualValidationsForFeatureLimit('10');
    featureSettings.selectFeatureType('NoMaxLimit', true);
    featureSettings.individualValidationsForFeatureLimit('5');
    featureSettings.individualValidationsForFeatureLimit('100');
  });

  it('Features with "Contributes to PRTP" toggled off are not available in features accordion', () => {
    const featureSettings = new FeaturesSettingAccordion();
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.ABCDC',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'MTGM',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802',
      releaseDate: '2019-03-19'
    };

    cy.visitPage(profile);
    featureSettings.expandFeaturesAccordion();
    featureSettings.expandFeatureSettingsAccordion();
    featureSettings.selectFeatureType('InactiveFeature', false);
    featureSettings.selectFeatureType('NoContributionToPRTP', false);
  });

  it('Auto-saving a feature setting', () => {
    const featureSettings = new FeaturesSettingAccordion();
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.AA321',
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

    const name = 'TestFeature-1';
    const fieldDetails = {featureName: name,
                          featureType: 'AllLimits',
                          featureLimit: '15',
                          minimumPRPTPercentage: '35',
                          maximumPRPTPercentage: '40',
                          comments: 'This is a test'};
    cy.route('/data/modelSpecification/*/featureSettings?*', {
      message: 'No feature settings found',
      modelFeatureSettings: []
    });

    cy.visitPage(profile);
    featureSettings.expandFeaturesAccordion();
    featureSettings.expandFeatureSettingsAccordion();
    featureSettings.clickAddFeatureAndVerifyFeildCount();
    featureSettings.inputValuesForNewFeature(fieldDetails);
    featureSettings.verifyCreateFeatureSettingsIsInvoked('name', name);
  });
});
