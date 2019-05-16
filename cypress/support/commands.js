// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import {AVERAGE} from "../testing-data/limits";
import Chance from 'chance'

Cypress.Commands.add("createUser", (requestBody) => {
    cy.request('POST', '/api/users', requestBody).then((response) => {
        cy.writeFile('cypress/fixtures/users.json', response.body)
    })
})

Cypress.Commands.add("generateUserData", (testingData) => {
    cy.fixture('limits').then(limits => {
        testingData.forEach((dataSet) => {
            dataSet.requestData = {name: "", job: ""}
            for (let property in dataSet.requestData) {
                dataSet.requestData[property] = (dataSet.description.includes(AVERAGE)) ?
                    Chance().string({
                        length: Chance().integer({
                            min: limits[property].min + 1,
                            max: limits[property].max - 1
                        })
                    }) :
                    Chance().string({length: limits[property][dataSet.description]})
            }
        })
        cy.writeFile('cypress/fixtures/usersData.json', testingData)
    })
})
