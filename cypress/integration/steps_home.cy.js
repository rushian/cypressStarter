import { Given,When,Then,And } from "cypress-cucumber-preprocessor/steps";
import page01 from '../support/pageObjects/HomePage.cy.js'
const pg01 = new page01

Given('I am on the home page', () => {
    pg01.acessarSite()
})

When("I choose departure and destination", () => {
    pg01.selecionarOrigemDestino()
})
And("I click the 'Find flights' button", () => {
    pg01.clicarEmEncontrarVoos()
})

Then("I should be redirected to choose a flight", () => {
    pg01.validarTitulo()
})