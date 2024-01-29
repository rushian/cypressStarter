/// <reference types="Cypress" />
const url = Cypress.config("baseUrl")

class HomePage {
    optionOrigem  = () => { return 'fromPort' }
    optionDestino = () => { return 'toPort' }
    btnEncontrarVoos = () => { return 'Find Flights' }

    origem = 'São Paolo'
    destino = 'Berlin'

    // Acessa o site que será testado
    acessarSite() {
        cy.visit(url)
    }
    // selecionar origem e destino do voo
    selecionarOrigemDestino() {
        cy.getEl('name',this.optionOrigem).select(origem)
        cy.getEl('name',this.optionDestino).select(destino)
    }
    // 
    clicarEmEncontrarVoos() {
        cy.contains('input', 'Find Flights').click()
    }
    // validar se o titulo tem o texto
    validarTitulo(){
        cy.get('h3').should('have.text', 'Flights from ' + origem + ' to ' + destino + ': ')    
    }
}

export default HomePage