import { Given,When,Then } from '@badeball/cypress-cucumber-preprocessor'
//const {  Given,When,Then,And  } = require('cucumber')
import page01 from '../../pages/page_home'

Given(`que estou na pgina inicial`, () => {
    page01.acessarSite()
})

When(`selecionar a origem e destino`, () => {
    page01.selecionarOrigemDestino()
})

When(`clicar no botão 'Find Flights'`, () => {
    page01.clicarEmEncontrarVoos()
})

Then(`sou redirecionado para a tela de escolha de voo`, () => {
    page01.validarTitulo()
})








