class ActionsCommands {
    public inputEmailAddress (txt: string) {
        cy
            .get('#email1')
            .type(txt)
    }    
}

export default ActionsCommands