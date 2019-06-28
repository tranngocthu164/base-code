declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Stub bcvs response
       * @example
       * cy.stubBcvs(bcvs)
       */
      stubDealers(dealers): any
      /**
       * Stub dealer response
       * @example
       * cy.stubDealers(dealers)
       */
      stubDealers(dealers): any
      /**
       * Stub progressive setting response
       * @example
       * cy.stubProgressiveSettings(progressiveSettings)
       */
      stubProgressiveSettings(progressiveSettings): any
      /**
       * Stub setting combination response
       * @example
       * cy.stubSettingCombinations(settingCombinations)
       */
      stubSettingCombinations(settingCombinations): any
      /**
       * Stub specification history response
       * @example
       * cy.stubSpecHistory(history)
       */
      stubSpecHistory(history): any
      /**
       * Stub specification response
       * @example
       * cy.stubSpecification(specifications)
       */
      stubSpecification(specifications): any
      /**
       * Stub user standard link attachment response
       * @example
       * cy.stubStandardLinkAttachments(standardLinkAttachments)
       */
      stubStandardLinkAttachments(standardLinkAttachments): any
      /**
       * Stub user api response
       * @example
       * cy.stubUsers()
       */
      stubUsers(): any
      /**
       * Stub variation api response
       * @example
       * cy.stubVariations(variations)
       */
      stubVariations(variations: any): any
      /**
       * Stub version api response
       * @example
       * cy.stubVersion(version)
       */
      stubVersions(version: any): any
      /**
       * Stub feature-settings api response
       * @example
       * cy.stubFeatureSettings(featureSettings)
       */
      stubFeatureSettings(featureSettings): any
  
      /**
       * Visit the testing page
       * @example
       * cy.visitPage(profile)
       */
      visitPage(profile: import('../../projects/gaming-models-components/src/lib/models/profile.model').Profile): any
    }
  }
  