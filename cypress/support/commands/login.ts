export interface Profile {
    url1: string
    url2: string
}

Cypress.Commands.add("visitPage", (profile?: Profile): any => {
    if (profile) {
        const queryString: string[] = [];
        if (profile.url1) {
            queryString.push(`${profile.url1}`)
        }
        if (profile.url2) {
            queryString.push(`${profile.url2}`)
        }
        cy.visit(Cypress.env('appURL') + `${queryString.join('/')}`)
    }
})
//these codes copied from tarcop
import { Profile } from '../../../projects/gaming-models-components/src/lib/models/profile.model';
Cypress.Commands.add('visitPage', (profile?: Profile): any => {
  if (profile) {
    const queryString: string[] = [];
    if (profile.user.username) {
      queryString.push(`username=${profile.user.username}`);
    }
    if (profile.user.email) {
      queryString.push(`email=${profile.user.email}`);
    }
    if (profile.pageType) {
      queryString.push(`pageType=${profile.pageType}`);
    }
    if (profile.specificationNumber) {
      queryString.push(`specificationNumber=${profile.specificationNumber}`);
    }
    if (profile.pidc) {
      queryString.push(`pidc=${profile.pidc}`);
    }
    if (profile.applicationRef) {
      queryString.push(`applicationRef=${profile.applicationRef}`);
    }
    if (profile.classification) {
      queryString.push(`classification=${profile.classification}`);
    }
    if (profile.subClassification) {
      queryString.push(`subClassification=${profile.subClassification}`);
    }
    if (typeof profile.readOnly === 'boolean') {
      queryString.push(`readOnly=${profile.readOnly}`);
    }
    if (typeof profile.locked === 'boolean') {
      queryString.push(`locked=${profile.locked}`);
    }
    if (typeof profile.legacy === 'boolean') {
      queryString.push(`legacy=${profile.legacy}`);
    }
    if (typeof profile.pcAttach === 'boolean') {
      queryString.push(`pcAttach=${profile.pcAttach}`);
    }
    if (profile.versionId) {
      queryString.push(`versionId=${profile.versionId}`);
    }
    if (profile.releaseDate) {
      queryString.push(`releaseDate=${profile.releaseDate}`);
    }
    cy.visit(Cypress.env('appURL') + '?' + `${queryString.join('&')}`);
    // dấu “&” hay dấu “/” dùng đễ join các URL cho URL trên và quan sát URL nó đang xài dấu gì thì join = dấu đó
//ví dụ: https://docs.cypress.io/api/api/ntable-of-contents.html  đang join bằng dấu “/”
  }
});

