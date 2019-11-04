import Chance from 'chance'
import {createPet, getPetById} from "../../service/petService"
import {DATA_OPTIONS, getPetRequestData} from "../../helper/requestsDataGenerator"

describe('Tests for Get pet endpoint', () => {
    it('Positive: Get pet data', () => {
        let petData = getPetRequestData(DATA_OPTIONS.MAX)
        createPet(petData).then(response => {
            getPetById(response.body.id).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name', petData.name);
                expect(response.body).to.have.property('id', petData.id);
                expect(response.body).to.have.property('status', petData.status);
                expect(response.body.photoUrls).to.deep.equal(petData.photoUrls);
                expect(response.body.tags).to.deep.equal(petData.tags);
                expect(response.body.category).to.deep.equal(petData.category);
            })
        })
    })
    it('Negative: Nonexistent id C42', () => {
        getPetById(Chance().integer(), false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('Pet not found');
        })
    })
    it('Negative: ID as a string C43', () => {
        getPetById('anyString', false).then(response => {
            console.log(response)
            expect(response.status).to.eq(404);
            expect(response.statusText).to.eq('Not Found');
        })
    })
    it('Negative: No ID in parameter C44', () => {
        getPetById('', false).then(response => {
            console.log(response)
            expect(response.status).to.eq(405);
            expect(response.statusText).to.eq('Method Not Allowed');
        })
    })
})
