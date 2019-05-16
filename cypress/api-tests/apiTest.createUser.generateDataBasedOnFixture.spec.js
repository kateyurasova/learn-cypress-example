import '../support/commands'
import {MIN, MAX, AVERAGE} from "../testing-data/limits"

let testingData = [{description: MIN}, {description: MAX}, {description: AVERAGE}]

before(() => {
    cy.generateUserData(testingData)
})

describe('Test for reqres.in - Parameterized tests based on limits defined in fixture', () => {
    testingData.forEach((dataSet, index) => {
        it(`Positive: POST request - create user endpoint (values from file) ${dataSet.description} values` + index, () => {
            cy.fixture('usersData').then(usersData => {
                cy.request('POST', '/api/users', usersData[index].requestData).then((response) => {
                    expect(response.status).to.eq(201)
                    expect(response.body).to.have.property('name', usersData[index].requestData.name)
                    expect(response.body).to.have.property('job', usersData[index].requestData.job)
                })
            })
        })
    })
})
