import '../../support/commands'
import {DATA_OPTIONS, getUserData} from "../../helper/requestsDataGenerator";

describe('Tests for reqres.in', () => {
    it('Positive: POST request - create user endpoint (values from file)', () => {
        cy.fixture('user').then(user => {
            cy.request('POST', '/api/users', user).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name', user.name) // true
                expect(response.body).to.have.property('job', user.job) // true
            })
        })
    })

    it('Negative: POST request - login unsuccessful', () => {
        cy.request(
            {
                method: "POST",
                url: "/api/login",
                failOnStatusCode: false,
                body: {"email": "peter@klaven"}
            }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })
})

describe('Parametrized test for create user endpoint', () => {
    let testingData = [
        {
            description: 'Max values',
            requestData: getUserData(DATA_OPTIONS.MAX)
        },
        {
            description: 'Min values',
            requestData: getUserData(DATA_OPTIONS.MIN)
        },
        {
            description: 'Random Average values',
            requestData:getUserData(DATA_OPTIONS.AVERAGE)
        }
    ]
    testingData.forEach(({description, requestData}) => {
        it(`Positive: POST request - create user endpoint (random values) - ${description}`, () => {
            // Experiment with support commands
            cy.request('POST', '/api/users', requestData).then((response) => {
                expect(response.status).to.eq(201)
                console.log(response)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body).to.have.property('job', requestData.job)
            })
        })
    })

})
