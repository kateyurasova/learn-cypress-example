import {Chance} from "chance"
import {PET_LIMIT, USER_LIMITS} from "./limits";

let chance = Chance()

export const DATA_OPTIONS = {MIN: "min", MAX: "max", AVERAGE: "average"}

export const getUserData = (param = DATA_OPTIONS.AVERAGE) => {
    return (param === DATA_OPTIONS.AVERAGE) ?
        {
            name: Chance().string({length: Chance().integer({min: USER_LIMITS.name.min, max: USER_LIMITS.name.max})}),
            job: Chance().string({length: Chance().integer({min: USER_LIMITS.job.min, max: USER_LIMITS.job.max})}),
        } : (param === DATA_OPTIONS.MAX) ? {
            name: Chance().string({length: USER_LIMITS.name.max}),
            job: Chance().string({length: USER_LIMITS.job.max}),
        } : {
            name: Chance().string({length: USER_LIMITS.name.min}),
            job: Chance().string({length: USER_LIMITS.job.min}),
        }
}

export const getPetRequestData = (param = DATA_OPTIONS.AVERAGE, onlyRequiredFields = false) => {
    let petDataSet = (param === DATA_OPTIONS.AVERAGE) ?
        {
            name: Chance().string({length: PET_LIMIT.name.max / 2}),
            id: getRandomPetId(),
            category: {
                id: getRandomCategoryId(),
                name: Chance().string({length: PET_LIMIT.category.name.max / 2}),
            },
            status: chance.pickone(PET_LIMIT.status),
            photoUrls: fillUrls(Chance().integer({
                min: PET_LIMIT.photoUrls.urlCount.min,
                max: PET_LIMIT.photoUrls.urlCount.max
            })),
            tags: fillTags(Chance().integer({
                min: PET_LIMIT.tags.urlCount.minValue,
                max: PET_LIMIT.tags.urlCount.maxValue
            }))
        } : (param === DATA_OPTIONS.MAX) ? {
            name: Chance().string({length: PET_LIMIT.name.max}),
            id: getRandomPetId(),
            category: {
                id: getRandomCategoryId(),
                name: Chance().string({length: PET_LIMIT.category.name.max}),
            },
            status: chance.pickone(PET_LIMIT.status),
            photoUrls: fillUrls(PET_LIMIT.photoUrls.urlCount.max),
            tags: fillTags(PET_LIMIT.tags.urlCount.max)
        } : {
            name: Chance().string({length: PET_LIMIT.name.min}),
            category: {
                id: getRandomCategoryId(),
                name: Chance().string({length: PET_LIMIT.category.name.min}),
            },
            id: getRandomPetId(),
            status: chance.pickone(PET_LIMIT.status),
            photoUrls: fillUrls(PET_LIMIT.photoUrls.urlCount.min),
            tags: fillTags(PET_LIMIT.tags.urlCount.min)
        }

    if (onlyRequiredFields) {
        let filteredDataSet = {}
        for (let property in petDataSet) {
            if (PET_LIMIT.requiredFields.includes(property)) {
                filteredDataSet[property] = petDataSet[property]
            }
        }
        return filteredDataSet
    } else {
        return petDataSet
    }
}

export const fillUrls = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr[i] = Chance().string()
    }
    return arr;
}

export const fillTags = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr[i] = {
            id: Chance().integer({min: PET_LIMIT.tags.id.minValue, max: PET_LIMIT.tags.id.maxValue}),
            name: Chance().string({length: 100})
        };
    }
    return arr;
}

export const getRandomPetId = () => {
    return Chance().integer({min: PET_LIMIT.id.minValue, max: PET_LIMIT.id.maxValue})
}

export const getRandomCategoryId = () => {
    return Chance().integer({min: PET_LIMIT.category.id.minValue, max: PET_LIMIT.category.id.maxValue})
}

