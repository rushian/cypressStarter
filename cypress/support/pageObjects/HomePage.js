/// <reference types="cypress" />
const url = 'https://blazedemo.com'

let origem = 'São Paolo'
let destino = 'Berlin'

class HomePage {
    optionOrigem  = () => { return 'fromPort' }
    optionDestino = () => { return 'toPort' }
    btnEncontrarVoos = () => { return 'Find Flights' }




    // Acessa o site que será testado
    acessarSite() {
        return cy.visit(url)
    }
    // selecionar origem e destino do voo
    selecionarOrigemDestino() {
        cy.get('select.form-inline:nth-child(1)').select('São Paolo').then(function(){
            return cy.get(`select[name='toPort']`).select('Berlin')
        })
    }
    // 
    clicarEmEncontrarVoos() {
        return cy.contains('input', 'Find Flights').click()
    }
    // validar se o titulo tem o texto
    validarTitulo(){
        return cy.get('h3').should('have.text', 'Flights from ' + origem + ' to ' + destino + ': ')    
    }
}

export default new HomePage 