import ProgressiveSettingAccordion from '../support/pages/progressiveSettings';
import { Profile } from '../../projects/gaming-models-components/src/lib/models/profile.model';


describe('Progressive Setting  for SAP', () => {
  beforeEach(() => {
    cy.fixture('progressiveSettings').then(progSetting => {
      cy.stubProgressiveSettings([]);
    });
    cy.fixture('variations').then(variations => {
      cy.stubVariations(variations.modelVariations);
    });
  });
  it('Verify Add Progressive function and calculator results', () => {
    const ProgressiveSetting = new ProgressiveSettingAccordion();
    const profile: Profile = {
      user: {
        username: 'abc',
        email: 'abc@abc.com'
      },
      applicationRef: 'APP_REF',
      specificationNumber: '1.ModelA',
      pageType: 'version-create',
      readOnly: false,
      locked: false,
      classification: 'iSAP',
      subClassification: 'S95',
      legacy: false,
      pcAttach: true,
      versionId: '5c89d0d2f5838e8ea2b43802'
    };

    cy.visitPage(profile);

    ProgressiveSetting.expandStandaloneProgressivesAccordion();
    ProgressiveSetting.expandProgressiveSettingAccordion();
    ProgressiveSetting.addProgressiveSetting(1);

  });
});
