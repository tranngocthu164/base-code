class FeaturesSettingAccordion {

    public expandFeaturesAccordion() {
      cy
        .get('#features_title').as('accordionTitle')
        .should('not.have.class', 'mat-expanded')
        .click()
        .should('have.class', 'mat-expanded');
    }
  
    public expandFeatureSettingsAccordion() {
      cy
        .get('#feature_setting_heading > mat-expansion-panel-header')
        .should('not.have.class', 'mat-expanded')
        .click()
        .should('have.class', 'mat-expanded');
    }
  
    public clickAddFeatureAndVerifyFeildCount() {
      cy
        .get('#feature_setting_add_button').as('$addNewFeatureBtn')
        .click()
        .get('#feature_setting_heading th')
        .should('have.length', 7);
    }
  
    public validateMandatoryFields(fieldNames: Array<string>) {
      fieldNames.forEach(name => {
        cy.get('max-feature-settings tr *:not([disabled]):not([aria-disabled="true"])[id*="' + name + '"]').as('feature-field')
        .click()
        .then(() => {
          if (name === 'featureType') {
            cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true, multiple: true });
          }
        });
        cy.get('max-feature-settings tr *:not([disabled]):not([aria-disabled="true"])[id*="comments"]')
        .click();
        cy.get('@feature-field')
        .parents('mat-form-field')
        .should('have.descendants', 'max-error-icon');
      });
    }
  
    public validateMinCantBeLessThanMaxPRTP() {
      cy.get('max-feature-settings tr input:not([disabled])[id*="minimumPRPTPercentage"]').as('minPercentage')
      .type('45')
      .get('max-feature-settings tr input:not([disabled])[id*="maximumPRPTPercentage"]').as('maxPercentage')
      .type('33')
      .get('@minPercentage')
      .click()
      .parents('mat-form-field').as('minParent')
      .within(($parent) => {
        cy.get('max-error-icon')
        .should('have.attr', 'ng-reflect-message', 'Feature PRTP min cannot be gre');
      });
    }
  //public dùng để public những cái viết bên trong để xài đc tất cả mọi nơi
  //deleteFeatureByFeatureName dùng để xóa 1 row
  //deleteFeatureByFeatureName đc đặt tên giống tên của class khai báo nó
  //featurename là 1 biến có kiểu string
  //tr.max-row là tìm trong web/element cái classs là tr và có tên là max-row
  //its(`length`) là lấy số item/số row/ hiện là 2 rows
  //hàm get đi đôi hàm its()
  //.as(`rowlist`): rowlist là dùng để ngắn gọn lại tên biến `max-feature-settings tr.mat-row`
  //nên phía dưới chỉ cần ghi là cy.get('@rowList') cho ngắn gọn mình dùng lệnh .as(biến ngắn gọn hơn)
    public deleteFeatureByFeatureName(featureName: string) {//la biến truyền vào
      let initialRowCount;//khai báo biến initialRowCount
      cy.get('max-feature-settings tr.mat-row').as('rowList')
      .its('length')
      .then((length) => {//sau khi thực hiện .its('length') thì biến initialRowCount = length
        initialRowCount = length;
      });
      //thực hiện get('@rowList'), cứ mỗi featurerow (là class hay div, hay tr gì đó trong console)
      //wrap từng cái featureRow đó như là 1 currentRow
      // tiếp tục tìm cái div, class, hay thẻ có tên là input, trong đó tìm tiếp cái id là featureName
      //tiếp: invoke cái value đó
      //tiếp: có value rồi thì ktra, nếu String($value) là = String(featureName) = 2
      //thì get ('@currentRow'), trong ('@currentRow') có chưa delete button
      //tiếp: click delete button
      //Tiếp: tìm cái class hay div, hay tr gì đó trong console có tên là max-confirm-dialog > 
      //tìm tiếp button có clas, div, tr hay j đó có tên là confirm_done > click nó
      //.should('not.exist')=> button đó exist, biến mất
      //tiếp: get('@rowList') > check lại .its('length') => its('length') nhỏ hơn initialRowCount: là đúng
      cy.get('@rowList')
      .each(($featureRow) => {
        cy.wrap($featureRow).as('currentRow')
        .find('input[id*="featureName"]')
        .invoke('val')
        .then(($value) => {
          if (String($value) === String(featureName)) {
            cy.get('@currentRow')
            .contains('Delete')
            .click();
            cy.get('max-confirm-dialog')
            .find('#confirm_done')
            .click()
            .should('not.exist');
          }
        });
      })
      .then(() => {
        cy.get('@rowList')
        .its('length')
        .should('be.lessThan', initialRowCount);
      });
    }
  //featureName là biến truyền vào
  //get html element là max-feature-settings > tìm id là featureTypeDropdown
  //mà không có element là disabled và cũng ko có element aria-disabled nào là ="true"
    public selectFeatureType(featureName: string, shouldBeAvailable: boolean ) {
      cy.get('max-feature-settings tr *:not([disabled]):not([aria-disabled="true"])[id*="featureTypeDropdown"]').as('dropdown')
      .click();// click vào field đó > sổ ra 1 cái dropdown có nhìu value
      cy.get('div[id*="cdk-overlay"] > div')//tìm element có id*="cdk-overlay > tìm field con dưới element đó
      .then(($parentElement) => {
        if (Boolean(shouldBeAvailable)) {
          cy.wrap($parentElement)
          .contains(String(featureName))
          .click();
        } else {
          cy.wrap($parentElement)
          .should('not.have.descendants', 'mat-option[ng-reflect-value="' + featureName + '"]');
          cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true, multiple: true });
        }
      });
    }
  
    public individualValidationsForFeatureLimit(limit: string, errorMessage?: string) {
      cy.get('max-feature-settings tr *:not([disabled]):not([aria-disabled="true"])[id*="featureLimit"]').as('featureLimit')
      .clear()
      .type(limit);
      cy.get('max-feature-settings tr *:not([disabled]):not([aria-disabled="true"])[id*="comments"]')
      .click();
      cy.get('@featureLimit')
      .parents('mat-form-field')
      .then(($parentElement) => {
        if (errorMessage) {
          cy.wrap($parentElement)
          .find('max-error-icon')
          .should('have.attr', 'ng-reflect-message', String(errorMessage));
        } else {
          cy.wrap($parentElement)
          .should('not.have.descendants', 'max-error-icon');
        }
      });
    }
  
    public inputValuesForNewFeature(fieldDetailsObject: object) {
      for (const field of Object.keys(fieldDetailsObject)) {
        cy.get('max-feature-settings tr *[id*="' + field + '"]').as('fieldObject')
        .then(fieldObject => {
          if (field === 'featureType') {
            this.selectFeatureType(fieldDetailsObject[field], true);
          } else {
            cy.get('@fieldObject')
            .type(fieldDetailsObject[field]);
          }
        });
      }
    }
  
    public verifyCreateFeatureSettingsIsInvoked(fieldName: string, fieldValue: string) {
      cy.wait('@createFeatureSettings')
      .its('requestBody')
      .then((body: Cypress.ObjectLike) => {
        expect(body).to.have.property(fieldName, fieldValue);
      });
    }
  }
  
  export default FeaturesSettingAccordion;
  