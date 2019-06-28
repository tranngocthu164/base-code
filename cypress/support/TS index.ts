// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './stubs/stubMasterList';
import './stubs/stubSpecifications';
import './stubs/stubDealers';
import './stubs/stubUsers';
import './stubs/stubBcvs';
import './stubs/stubProgressiveSettings';
import './stubs/stubSettingCombinations';
import './stubs/stubSpecHistory';
import './stubs/stubStandardLinkAttachments';
import './stubs/stubVariations';
import './stubs/stubVersions';
import './commands/login';
import './commands/autCommands';
import './stubs/stubFeatureSettings';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


