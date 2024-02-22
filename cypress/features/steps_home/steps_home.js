import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
//const {  Given,When,Then,And  } = require('cucumber')
import page01 from '../../support/pageObjects/HomePage.js'

Given(`I am on the home page`, () => {
    page01.acessarSite()
})

When(`I choose departure and destination`, () => {
    page01.selecionarOrigemDestino()
})

When(`I click the "Find Flights" button`, () => {
    page01.clicarEmEncontrarVoos()
})

Then(`I should be redirected to choose a flight`, () => {
    page01.validarTitulo()
})






