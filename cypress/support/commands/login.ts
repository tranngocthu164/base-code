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