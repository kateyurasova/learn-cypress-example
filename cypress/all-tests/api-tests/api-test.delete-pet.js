import Chance from 'chance'
import {createPet, deletePet} from "../../service/petService"
import {getPetRequestData} from "../../helper/requestsDataGenerator"

describe('Tests for Delete pet endpoint', () => {
    let petData = getPetRequestData()
    it('Positive: Delete pet C10', () => {
        createPet(petData).then(response => {
            deletePet(response.body.id).then(response => {
                expect(response.status).to.eq(200);
            })
        })
    });

    it('Positive: Delete the same pet entity twice C11', () => {
        createPet(getPetRequestData()).then(response => {
            let petId = response.body.id
            deletePet(petId).then(response => {
                expect(response.status).to.eq(200);
                deletePet(petId, false).then(response => {
                    expect(response.status).to.eq(404, 'Pet not found');
                })
            })
        })
    });

    it('Negative: Nonexistent id C12', () => {
        deletePet(Chance().integer(), false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.status).to.eq(404, 'Not found');
        })
    })
    it('Negative: Invalid pet Id (string instead of integer) C13', () => {
        deletePet('anyStringValue&^', false).then(response => {
            console.log(response)
            expect(response.status).to.eq(404);
            expect(response.statusText).to.eq('Not Found');

        })
    })
    it('Negative: No ID in parameter C14', () => {
        deletePet('', false).then(response => {
            expect(response.status).to.eq(405);
            expect(response.statusText).to.eq('Method Not Allowed');
        })
    })

});
