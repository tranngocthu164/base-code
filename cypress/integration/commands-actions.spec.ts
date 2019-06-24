import { Profile } from '../support/commands/login'
import ActionsCommands from '../support/pages/actionscommands'

describe('Test commands- actions page', () => {
  it('Input email address', () => {
    const action = new ActionsCommands();
    const profile : Profile = {
      url1 : "commands",
      url2 : "actions"
    }
    cy.visitPage(profile);
    action.inputEmailAddress('abc@abc.com')
  })
})
