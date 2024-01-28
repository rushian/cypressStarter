// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { command } from 'commander'
import './commands'

before(() => {
    cy.log('e2e.js - BEFORE ALL')
    console.log('Escrita no console - teste')
})

after(() => {
    cy.log('e2e.js - AFTER ALL')
})