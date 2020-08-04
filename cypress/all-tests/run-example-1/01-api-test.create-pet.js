import Chance from 'chance'
import {createPet} from "../../service/petService"
import {DATA_OPTIONS, getPetRequestData} from "../../helper/requestsDataGenerator"
import {API_URL} from "../../service/apiSettings"

describe('Create new Pet', () => {

    let testingData = [
        {
            description: 'All fields are filled in with min values C7',
            requestData: getPetRequestData(DATA_OPTIONS.MAX)
        },
        {
            description: 'All fields are filled in with max values C8',
            requestData: getPetRequestData(DATA_OPTIONS.AVERAGE)
        },
        {
            description: 'All fields are filled in with average values C9',
            requestData: getPetRequestData(DATA_OPTIONS.MIN)
        }
    ];

    testingData.forEach(({description, requestData}) => {
        it(description, () => {
            createPet(requestData).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', requestData.id);
                expect(response.body.id).to.be.greaterThan(0)
                expect(response.body).to.have.property('name', requestData.name);
                expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls);
                expect(response.body.tags).to.deep.equal(requestData.tags);
            })
        })
    });

    it('Positive: Only required fields (name and photoUrl) C59', () => {
        let requestData = getPetRequestData(DATA_OPTIONS.AVERAGE, true)
        createPet(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.greaterThan(0)
            expect(response.body).to.have.property('name', requestData.name);
            expect(response.body.photoUrls).to.deep.equal(requestData.photoUrls);
        })
    });
    it('Negative: No values (empty body) C60', () => {
        let requestData = {}
        createPet(requestData).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    });
    it('Negative: No body in request C61', () => {
        cy.request({method: 'POST', url: `${API_URL}/pet`, failOnStatusCode: false}).then(response => {
            console.log(response)
            expect(response.status).to.eq(415);
        })
    });
    it('Negative: Required fields are null C62', () => {
        createPet({name: null, photoUrls: null}, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    });
    it('Negative: Invalid pet status (numeric instead of valid string value) C63', () => {
        let requestData = getPetRequestData()
        requestData.status = 1
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid pet status value');
        })
    });
    it('Negative: Invalid tag name (numeric instead of valid string value) C64', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].name = 2
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid tag name value');
        })
    });
    it('Negative: Invalid pet id (string valid instead of numeric value) C65', () => {
        let requestData = getPetRequestData()
        requestData.id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.message).to.eq('Invalid pet id status value');
        })
    });
    it('Negative: Invalid tag id (string valid instead of numeric value) C66', () => {
        let requestData = getPetRequestData()
        requestData.tags[0].id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400)
            expect(response.statusText).to.eq('Bad Request');
        })
    });
    it('Negative: Invalid category id (string valid instead of numeric value) C67', () => {
        let requestData = getPetRequestData()
        requestData.category.id = Chance().string()
        createPet(requestData, false).then(response => {
            expect(response.status).to.eq(400);
            expect(response.statusText).to.eq('Bad Request');
        })
    })
});


