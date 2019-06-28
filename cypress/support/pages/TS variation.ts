import { Variation, VariationFieldState } from './models/variation.model';

class VariationAccordion {

  public checkVariation(rowNumber: Number) {
    this.changeVariationCheckboxState(rowNumber, 'true');
  }

  public uncheckVariation(rowNumber: Number) {
    this.changeVariationCheckboxState(rowNumber, 'false');
    cy.get('#confirm_done').click();
  }

  public uncheckAllVariationButton() {
    this.changeAllVariationButtonState('unchecked');
  }

  public checkAllVariationButton() {
    this.changeAllVariationButtonState('checked');
  }

  public expandVariationAccordion() {
    cy
    .get('#variation_title')
    .find('mat-expansion-panel-header')
    .invoke('attr', 'aria-expanded')
    .then($isExpanded => {
      if (String($isExpanded) === 'false') {
        cy.get('#variation_header')
        .click();
      }
    });
  }

  public clickAddVariation() {
    cy.get('#addVariation')
    .click();
  }

  public verifyEachVariationIsChecked() {
    this.verifyEachVariationCheckState('true');
  }

  public verifyEachVariationIsUnchecked() {
    this.verifyEachVariationCheckState('false');
  }

  public verifyAllVariationButtonIsMixed() {
    this.verifyAllVariationButtonCheckState('mixed');
  }

  public verifyActiveVariationIsPreselected() {
    cy
    .get('#variation_table tbody tr')
    .each(($el, index) => {
      cy.wrap($el)
      .as('currentRow')
      .find(`#variationStatusDropdown_${index + 1}`)
      .invoke('attr', 'data-value')
      .then($state => {
        switch (String($state)) {
          case 'active':
            cy.get('@currentRow')
            .find('mat-checkbox input')
            .should('have.attr', 'aria-checked', 'true');
            break;
          case 'inactive':
          cy.get('@currentRow')
          .find('mat-checkbox input')
          .should('have.attr', 'aria-checked', 'false');
        }
      });
    });
  }

  public inputVAR(rowNumber: Number, value: Number) {
    cy.get(`#variation_row_${rowNumber}`)
    .find('#variationNumber')
    .type(String(value))
    .blur();
  }

  public inputDenom(rowNumber: Number, value: Number[]) {
    cy.get(`#variation_row_${rowNumber} max-multi-select`)
    .click();
    value.forEach(val => {
      cy.get('.cdk-overlay-container')
      .find(`mat-option[ng-reflect-value="${val}"]`)
      .click();
    });
    cy.get('body').type('{esc}');
  }

  public inputState(rowNumber: Number, state: string) {
    cy.get(`#variation_row_${rowNumber} mat-select-trigger`)
    .click();
    cy.get('.cdk-overlay-container')
    .find(`mat-option[ng-reflect-value="${state}"]`)
    .click();
    cy.get('body').type('{esc}');
  }

  public inputVariationRow(rowNumber: Number, variation: Variation) {
    if (variation.status) {
      this.inputState(rowNumber, variation.status);
    }
    if (variation.variationNumber) {
      this.inputVAR(rowNumber, variation.variationNumber);
    }
    if (variation.bcv) {
      this.inputDenom(rowNumber, variation.bcv);
    }
    if (variation.minimumBasePRTP) {
      this.inputField(rowNumber, '#minimumRTP', variation.minimumBasePRTP);
    }
    if (variation.maximumBasePRTP) {
      this.inputField(rowNumber, '#maximumRTP', variation.maximumBasePRTP);
    }
    if (variation.minimumFeaturePRTP) {
      this.inputField(rowNumber, '#minFeaturePRTP', variation.minimumFeaturePRTP);
    }
    if (variation.maximumFeaturePRTP) {
      this.inputField(rowNumber, '#maxFeaturePRTP', variation.maximumFeaturePRTP);
    }
    if (variation.sapPRTP) {
      this.inputField(rowNumber, '#sapPRTP', variation.sapPRTP);
    }
  }

  public verifyVariationFieldState(rowNumber: Number, fieldStates: VariationFieldState, pageType?: string) {
// tslint:disable-next-line: forin
    for (const field in fieldStates) {
      if (fieldStates[field] === 'disabled') {
        if (field === 'state') {
          if (pageType === 'version-create') {
            cy.get(`#variationStatusDropdown_${rowNumber}`)
            .should('have.class', 'mock-field-disabled');
          } else {
            cy.get(`#variationStatusDropdown_${rowNumber}`)
            .should('have.attr', 'ng-reflect-disabled', 'true');
          }
        } else {
          cy.get(`#variation_row_${rowNumber}`)
          .find(`#${field}`)
          .should('have.class', 'mock-field-disabled')
          .parent('div')
          .should('have.class', 'field');
        }
      }
      if (fieldStates[field] === 'enabled') {
        if (field === 'state') {
          cy.get(`#variationStatusDropdown_${rowNumber}`)
          .should('have.attr', 'ng-reflect-disabled', 'false');
        }
      }
      if (fieldStates[field] === 'highlight') {
        cy.get(`#variation_row_${rowNumber}`)
        .find(`#${field}`)
        .should('have.class', 'ng-invalid');
      }
      if (fieldStates[field] === 'invalid') {
        cy.get(`#variation_row_${rowNumber}`)
        .find(`#${field}`)
        .should('have.attr', 'aria-invalid', 'true');
      }
      if (fieldStates[field] === 'masked') {
        if (field === 'sapPRTP') {
          cy.get(`#variation_row_${rowNumber}`)
          .find(`#${field}`)
          .parents('td')
          .should('have.class', 'add-mask');
        } else {
          cy.get(`#variation_row_${rowNumber}`)
          .find(`#${field}`)
          .parent('div')
          .should('have.class', 'add-mask');
        }
      }
    }
  }

  public verifyTotalMinPRTPInError(rowNumber: Number, errMsg: String) {
    cy.get(`#variation_row_${rowNumber} #minTotalPRTP`)
    .find('max-error-icon')
    .should('have.attr', 'ng-reflect-message', errMsg);
  }


  public verifyTotalMinPRTP(rowNumber: Number, value: string) {
    cy.get(`#variation_row_${rowNumber}`)
    .find('#minTotalPRTP')
    .contains(value);
  }

  private inputField(rowNumber: Number, fieldId: string, value: Number) {
    cy.get(`#variation_row_${rowNumber}`)
    .find(fieldId)
    .clear()
    .type(String(value))
    .blur();
  }

  private changeVariationCheckboxState(rowNumber: Number, state: String) {
    cy
    .get(`#variation_row_${rowNumber}`)
    .find('mat-checkbox')
    .as('currentCheckbox')
    .find('input')
    .as('checkInput')
    .invoke('attr', 'aria-checked')
    .then($isChecked => {
      if (String($isChecked) !== state) {
        return cy.get('@currentCheckbox')
        .click();
      }
    })
    .get('@checkInput')
    .should('have.attr', 'aria-checked', state);
  }

  private verifyEachVariationCheckState(state: String) {
    cy
    .get('#variation_table tbody tr')
    .each(($el) => {
      cy.wrap($el)
      .find('mat-checkbox')
      .find('input')
      .should('have.attr', 'aria-checked', state);
    });
  }

  private verifyAllVariationButtonCheckState(state: String) {
    cy
    .get('#variation_header')
    .find('mat-checkbox')
    .as('headingCheckbox')
    .find('input')
    .invoke('attr', 'aria-checked')
    .should('eq', state);
  }

  private changeAllVariationButtonState(state: String) {
    cy
    .get('#variation_header')
    .find('mat-checkbox')
    .as('headingCheckbox')
    .find('input')
    .invoke('attr', 'aria-checked')
    .then($checkState => {
      if (state === 'checked') {
        switch (String($checkState)) {
          case 'mixed':
            cy.get('@headingCheckbox')
            .click();
            break;
          case 'false':
          cy.get('@headingCheckbox')
          .click();
        }
      } else {
        switch (String($checkState)) {
          case 'mixed':
            cy.get('@headingCheckbox')
            .click()
            .click();
            break;
          case 'true':
          cy.get('@headingCheckbox')
          .click();
        }
      }
    });
  }

  public verifyStateForEditPage(): void {
    cy
    .get('#variation_table tbody tr')
    .each(($el, index) => {
      cy.wrap($el)
      .get(`#variationStatusDropdown_${index + 1}`)
      .should('not.have.class', '.mock-field-disabled ng-star-inserted')
      .as('stateDropDown')
      .then(() => {
        if (cy.get('@stateDropDown').find('.mat-select-trigger > .mat-select-value')) {
          cy.get('@stateDropDown')
          .should('have.attr', 'class')
          .and('not.include', 'disabled') ;
        } else {
          cy.get('@stateDropDown')
          .should('have.attr', 'class')
          .and('include', 'disabled') ;
        }
      });
    });
  }

  public verifyVarNumberForEditPage(): void {
    cy
    .get('#variation_table tbody tr')
    .each(($row, index) => {
      cy.wrap($row)
      .get('#variationNumber')
      .should('have.class', 'mock-field-disabled ng-star-inserted');
  });
  }
}

export default VariationAccordion;
