import Chance from 'chance'
import {createPet} from "../../service/petService"
import {DATA_OPTIONS, getPetRequestData} from "../../helper/requestsDataGenerator"
import {API_URL} from "../../service/apiSettings"

describe('Create new Pet', () => {

    let testingData = [
        {
            description: 'All fields are filled in with min values C24',
            requestData: getPetRequestData(DATA_OPTIONS.MAX)
        },
        {
            description: 'All fields are filled in with max values C25',
            requestData: getPetRequestData(DATA_OPTIONS.AVERAGE)
        },
        {
            description: 'All fields are filled in with average values C26',
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

});


