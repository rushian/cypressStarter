describe('Blazedemo', () => {
  let origem = 'São Paolo'
  let destino = 'Berlin'
  it('Comprar passagem', () => {
    cy.log('acessar a home page')
    cy.visit('/')
    cy.log('selecionar origem e destino com as variaveis determinadas acima')
    cy.getEl('name','fromPort').select(origem)
    cy.getEl('name','toPort').select(destino)
    cy.log('clicar em encontrar voos')
    cy.contains('input', 'Find Flights').click()
    cy.log('validar se o titulo tem o texto')
    cy.get('h3').should('have.text', 'Flights from ' + origem + ' to ' + destino + ': ')
    cy.log('tirar print como evidencia')
    cy.screenshot()
    cy.log('escolher o voo da Aer Lingus')
    cy.get('table > tbody > tr').contains('Aer Lingus').then((linha) => {
        linha.parent().find('td input').click();
    })
    //cy.get(':nth-child(1) > :nth-child(3) > .btn').click() -- OUTRA FORMA
    cy.log('preencher dados de pagamento')
    cy.getEl('id','inputName').type('Luciano')
    cy.get('#address').type('Test Avenue, 777')
    cy.get('#city').type('Sao Paulo')
    cy.getEl('id','cardType').select('American Express')
    cy.getEl('id','rememberMe').click()
    cy.contains('input', 'Purchase Flight').click()
    cy.log('validar se o titulo tem o texto')
    cy.get('h1').should('have.text', 'Thank you for your purchase today!')
    cy.log('tirar print como evidencia')
    cy.screenshot()
  })
})