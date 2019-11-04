import {API_URL} from "./apiSettings"

export const createPet = (body, autoControl = true) => {
    return cy.request({
        method: 'POST',
        url: `${API_URL}/pet`,
        body: body,
        failOnStatusCode: autoControl,
    })
}

export const updatePet = (body, autoControl = true) => {
    return cy.request({
        method: 'PUT',
        url: `${API_URL}/pet`,
        body: body,
        failOnStatusCode: autoControl,
    })
}

export const getPetById = (petId, autoControl = true) => {
    return cy.request({
        method: 'GET',
        url: `${API_URL}/pet/${petId}`,
        failOnStatusCode: autoControl
    })
}

export const deletePet = (petId, autoControl = true) => {
    return cy.request({
        method: 'DELETE',
        url: `${API_URL}/pet/${petId}`,
        failOnStatusCode: autoControl
    })
}
