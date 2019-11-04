export const PET_LIMIT = {
    name: {min: 1, max: 100},
    id: {minValue: 1000, maxValue: 100000},
    status: ['available', 'pending', 'sold'],
    photoUrls: {
        urlCount: {min: 1, max: 100},
        length: {min: 1, max: 10}
    },
    tags: {
        urlCount: {minValue: 1, maxValue: 100},
        name: {min: 1, max: 10},
        id: {minValue: 1000, maxValue: 100000},
    },
    category: {
        id: {minValue: 1000, maxValue: 100000},
        name: {min: 1, max: 1000}
    },
    requiredFields: ["name", "photoUrls"]

}

export const USER_LIMITS = {
    name: {min: 1, max: 100},
    job: {min: 1, max: 100}
}


