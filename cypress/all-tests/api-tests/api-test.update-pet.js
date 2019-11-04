import Chance from 'chance'
import {createPet, updatePet} from "../../service/petService"
import {getPetRequestData} from "../../helper/requestsDataGenerator"
import {API_URL} from "../../service/apiSettings"

describe('Tests for Update pet endpoint', () => {
    it('Positive: Update pet data C37', () => {
        let initialPetData = getPetRequestData()
        let newPetData = getPetRequestData()
        createPet(initialPetData).then(response => {
            newPetData.id = response.body.id
            updatePet(newPetData).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', newPetData.name);
                expect(response.body).to.have.property('id', newPetData.id);
                expect(response.body).to.have.property('status', newPetData.status);
                expect(response.body.photoUrls).to.deep.equal(newPetData.photoUrls);
                expect(response.body.tags).to.deep.equal(newPetData.tags);
                expect(response.body.category).to.deep.equal(newPetData.category);
            })
        })
    });
    it('Positive: Update pet data - empty body C38', () => {
        let initialPetData = getPetRequestData()
        let newPetData = {}
        createPet(initialPetData).then(response => {
            newPetData.id = response.body.id
            updatePet(newPetData).then(response => {
                expect(response.status).to.eq(200);
            })
        })
    });
    it('Negative: No body in request C28', () => {
        cy.request({method: 'PUT', url: `${API_URL}/pet`, failOnStatusCode: false}).then(response => {
            console.log(response)
            expect(response.status).to.eq(415);
        })
    })
    it('Negative: Update pet with Nonexistent id C29', () => {
        let newPetData = getPetRequestData()
        newPetData.id = Chance().string({length: 50, pool: "0123456789"})
        updatePet(newPetData, false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.status).to.eq(404, 'Not found');
        })
    });
    it('Negative: Invalid pet ID (empty) C30', () => {
        let requestData = getPetRequestData()
        requestData.id = ''
        updatePet(requestData, false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.status).to.eq('Not found');
        })

    })
    it('Negative: Invalid pet Id (string instead of integer) C31', () => {
        let requestData = getPetRequestData()
        requestData.id = 'anyString'
        updatePet(requestData, false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.status).to.eq('Not found');
        })
    })

    it('Negative: Invalid pet status (numeric instead of valid string value) C32', () => {
        let requestData = getPetRequestData()
        requestData.status = 1
        updatePet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid pet status value');
        })
    })
    it('Negative: Invalid tag name (numeric instead of valid string value) C33', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].name = 2
        updatePet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid tag name value');
        })
    })

    it('Negative: Invalid pet id (string valid instead of numeric value)', () => {
        let requestData = getPetRequestData()
        requestData.id = Chance().string()
        updatePet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid tag name value');
        })
    })
    it('Negative: Invalid tag id (string valid numeric value) C35', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].id = Chance().string()
        updatePet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Bad Request');
        })
    })
    it('Negative: Invalid category id (string valid numeric value) C36', () => {
        let requestData = getPetRequestData()
        requestData.category.id = Chance().string()
        updatePet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Bad Request');
        })
    })
});

