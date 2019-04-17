import Chance from 'chance'
import '../support/commands'
import {getLimits} from '../testing-data/limits'

const limits = getLimits()

describe('Test for reqres.in', () => {
    it('Positive: POST request - create user endpoint (values from file)', () => {
        cy.fixture('user').then(user => {
            cy.request('POST', '/api/users', user).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name', user.name) // true
                expect(response.body).to.have.property('job', user.job) // true
            })
        })
    })

    let testingData = [
        {
            description: 'Max values',
            requestData: {
                name: Chance().string({length: limits.name.max}),
                job: Chance().string({length: limits.job.max}),
            }
        },
        {
            description: 'Min values',
            requestData: {
                name: Chance().string({length: limits.name.min}),
                job: Chance().string({length: limits.job.max}),
            }
        },
        {
            description: 'Random Average values',
            requestData: {
                name: Chance().string({length: Chance().integer({min: limits.name.min, max: limits.name.max})}),
                job: Chance().string({length: Chance().integer({min: limits.job.min, max: limits.job.max})}),
            }
        }
    ]

    testingData.forEach(({description, requestData}) => {
        it(`Positive: POST request - create user endpoint (random values) - ${description}`, () => {
            cy.request('POST', '/api/users', requestData).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name', requestData.name)
                expect(response.body).to.have.property('job', requestData.job)
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
