import { LevelFieldState } from './models/settingCombination.model';

class SettingCombinationAccordion {

  public expandStandaloneProgressivesAccordion() {
    cy
    .get('#standalone_title')
    .find('mat-expansion-panel-header')
    .first()
    .should('have.attr', 'aria-expanded', 'false')
    .click()
    .should('have.attr', 'aria-expanded', 'true');
  }

  public expandSettingCombinationAccordion() {
    cy
    .get('#standalone_title')
    .find('#settingCombination_heading')
    .find('mat-expansion-panel-header')
    .should('have.attr', 'aria-expanded', 'false')
    .click()
    .should('have.attr', 'aria-expanded', 'true');
  }

  public addProgressiveSettingFromExistingCombinationSetting (indexOfSettingCombination: Number, progressiveSettingNumbers: Number[]) {
    cy
    .get('#standalone_title')
    .find(`#addRemoveLevels_${indexOfSettingCombination}`)
    .click();

    progressiveSettingNumbers.forEach(val => {
      this.clickButtonInTheRow(cy.get('#progressiveSettingList tbody tr .mat-column-progressiveSettingNo'), String(val));
    });

    cy
    .get('#done')
    .click();
  }


  public removeProgressiveSettingFromExistingCombinationSetting (indexOfSettingCombination: Number, progressiveSettingNumbers: Number[]) {
    cy
    .get('#standalone_title')
    .find(`#addRemoveLevels_${indexOfSettingCombination}`)
    .click();

    progressiveSettingNumbers.forEach(val => {
      this.clickButtonInTheRow(cy.get('#selectedProgressiveSettingList tbody tr .mat-column-progressiveSettingNo'), String(val));
    });

    cy
    .get('#done')
    .click();
  }

  public addNewSettingCombination(progressiveSettingNumbers: Number[]) {
    cy
    .get('#combination_add_button')
    .click();

    progressiveSettingNumbers.forEach(val => {
      this.clickButtonInTheRow(cy.get('#progressiveSettingList tbody tr .mat-column-progressiveSettingNo'), String(val));
    });

    cy
    .get('#done')
    .click();
  }

  public deleteSettingCombination(indexOfSettingCombination: Number) {
    cy
    .get(`#deleteSettingCombination_${indexOfSettingCombination}`)
    .click();

    cy
    .get('#confirm_done')
    .click();
  }

  public fillInJackpotTheme(indexOfSettingCombination: Number, content: string) {
    cy
    .get(`#jackpotTheme_${indexOfSettingCombination}`)
    .type(content, {force: true})
    .blur();
  }

  public verifyAddSettingCombinationButtonIsDisabled() {
    cy
    .get('#combination_add_button')
    .should('be.disabled');
  }

  public mapVariation(indexOfSettingCombination: Number, variationNumber: Number[]) {
    cy.get(`#variations_${indexOfSettingCombination} ~ button`).click();
    variationNumber.forEach(val => {
      cy.get(`#variation_select_checkbox_${val}`).click();
    });
    cy.get('#done').click();
  }

  private clickButtonInTheRow(column: Cypress.Chainable<JQuery<HTMLElement>>, val: string) {
    column
    .contains(val)
    .siblings('.mat-column-select')
    .find('button')
    .click();
  }

  public verifyLevelNamesInSequence(settingCombinationIndex: Number, levelNamesInSequence: string[]) {
    cy.get(`input[ng-reflect-id="levelName_${settingCombinationIndex}"]`)
    .each(($el, ind) => {
      cy.wrap($el)
      .invoke('val')
      .should('eq', levelNamesInSequence[ind]);
    });
  }

  public verifySettingsInSequence(settingCombinationIndex: Number, levelNamesInSequence: string[]) {
    cy.get(`div[id="progressiveSettingNumber_${settingCombinationIndex}"]`)
    .each(($el, ind) => {
      cy.wrap($el)
      .invoke('text')
      .then(text => {
        expect(String(text).trim()).to.equals(levelNamesInSequence[ind]);
      });
    });
  }

  public verifyCreateSettingCombinationIsCalledWith(numberOfSettings?: Number) {
    if (numberOfSettings) {
      cy.wait('@createSettingCombination')
      .its('requestBody')
      .then((body: Cypress.ObjectLike) => {
        expect(body.combinationLevels.length).to.equal(numberOfSettings);
      });
    }
  }

  public verifyUpdateSettingCombinationIsCalledWith(numberOfSettings?: Number) {
    if (numberOfSettings) {
      cy.wait('@updateSettingCombination')
      .its('requestBody')
      .then((body: Cypress.ObjectLike) => {
        expect(body.combinationLevels.length).to.equal(numberOfSettings);
      });
    }
  }

  public verifyDeleteSettingCombinationIsCalledWith(combinationIndex?: Number) {
    if (combinationIndex) {
      cy.wait('@deleteSettingCombination')
      .its('url')
      .then((url: string) => {
        expect(url[url.length - 1]).to.equal(String(combinationIndex));
      });
    }
  }

  public bulkUpdateLevelNames(combinationIndex: Number, levelNames: string[]) {
    cy.get(`#combination_${combinationIndex}`)
    .then($sc => {
      levelNames.forEach((val, ind) => {
        if (val) {
          cy.wrap($sc)
          .find(`#levelName_${ind + 1}`)
          .clear()
          .type(val)
          .blur();
        }
      });
    });
  }

  public verifyLevelFieldStates(combinationIndex: Number, rowNumber: Number, fieldStates: LevelFieldState) {
// tslint:disable-next-line: forin
    for (const field in fieldStates) {
      if (fieldStates[field] === 'normal') {
        cy.get(`#combination_${combinationIndex}`)
        .find(`#${field}_${rowNumber}`)
        .should('have.class', 'ng-valid')
        .should('have.attr', 'aria-invalid', 'false');
      }
      if (fieldStates[field] === 'invalid') {
        cy.get(`#combination_${combinationIndex}`)
        .find(`#${field}_${rowNumber}`)
        .should('have.class', 'ng-invalid')
        .should('have.attr', 'aria-invalid', 'true');
      }
    }
  }

  public verifyHeadingCount(count: Number) {
    cy
    .wait(1)
    .get('#standalone_title')
    .find('#settingCombination_heading')
    .find('mat-expansion-panel-header')
    .invoke('text')
    .then(text => {
      expect(String(text).trim()).to.equal(`Setting Combinations (${count})`);
    });
  }

  public verifySettingCombinationNumber(index: Number[]) {
    cy
    .get('max-setting-combinations mat-card-title div')
    .each(($el, ind) => {
      cy.wrap($el)
      .invoke('text')
      .then(text => {
        expect(String(text).trim()).to.equals(`Setting Combination No. ${index[ind]}`);
      });
    });
  }

  public nextSettingCombinationPage() {
    cy
    .get('max-setting-combinations button[ng-reflect-message="Next page"]')
    .click();
  }

  public previousSettingCombinationPage() {
    cy
    .get('max-setting-combinations button[ng-reflect-message="Previous page"]')
    .click();
  }
}

export default SettingCombinationAccordion;
