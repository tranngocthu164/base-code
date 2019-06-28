
class ProgressiveSettingAccordion {
    public expandStandaloneProgressivesAccordion() {
      cy
        .get('#standalone_title')
        .find('mat-expansion-panel-header')
        .first()
        .should('have.attr', 'aria-expanded', 'false')
        .click()
        .should('have.attr', 'aria-expanded', 'true');
    }
  
    public expandProgressiveSettingAccordion() {
      cy
        .get('#standalone_title')
        .find('#progressive_setting_heading')
        .find('mat-expansion-panel-header')
        .should('have.attr', 'aria-expanded', 'false')
        .click()
        .should('have.attr', 'aria-expanded', 'true');
      // wait for data to load
      cy. wait(2000);
    }
  
    public countProgSettingOnPage(): number {
      cy
        .get('#setting_card').get('mat-card > .mat-card-content >div')
        .then(($el) => {
          return ($el).length;
        });
       return 0;
    }
  
    public addProgressiveSetting(indexOfSetting: number) {
      cy
        .get('#progressive_setting_heading')
        .contains('Add Progressive Setting')
        .should('be.visible')
        .click()
        .should('be.disabled');
      cy
      .contains('Jackpot Type', { timeout : 20000 });
      const rowNo = indexOfSetting;
      cy
      .select({fieldName: `jackpotTypeDropdown_${rowNo}`, value: progressiveSettingRow.jackpotType});
      cy
      .get(`#startupAmount_${rowNo}`)
      .type(progressiveSettingRow.resetValue.toString())
      .blur();
      cy
      .get(`#maximumAmount_${rowNo}`)
      .type(progressiveSettingRow.jackpotLt.toString())
      .blur();
      cy
      .get(`#incrementPercentageProgressive_${rowNo}`)
      .type(progressiveSettingRow.IncPercentage.toString())
      .blur();
      cy
      .get(`#probability_${rowNo}`)
      .type(progressiveSettingRow.probability.toString())
      .blur();
      cy
      .get(`#startupPercentage_${rowNo}`)
      .should('have.text', progressiveSettingRow.startupPercentage);
      cy
      .get(`#totalPercentage_${rowNo}`)
      .should('have.text', progressiveSettingRow.totalPercentage);
  
      cy
      .get(`#expectedTurnover_${rowNo}`)
      .should('have.text', progressiveSettingRow.expectedTurnover);
  
      cy
      .get(`#expectedAmount_${rowNo}`)
      .should('have.text', progressiveSettingRow.expectedAmount);
    }
  }
  const progressiveSettingRow = {
  resetValue: 178,
  jackpotLt: 2890,
  IncPercentage: 0.93,
  hidden: 0.0,
  jackpotType: 'Standard',
  probability: 0.000006700,
  startupPercentage: ' 11.926000 ',
  totalPercentage: ' 12.856000 ',
  expectedTurnover: ' 1492.54 ',
  expectedAmount: ' 191.88 '
  };
  
  export default ProgressiveSettingAccordion;
  