import '../../support/commands'
import SearchResultsPage from "../../page-objects/searchResultsPage"
import AccessoriesPage from "../../page-objects/accessoriesPage"

describe('Google Market tests', () => {
    it('Positive: User is able to find product by name - without page object', () => {
        cy.log('GIVEN User is at the Accessories Wall page')
        cy.visit('https://store.google.com/us/collection/accessories_wall?hl=en-US')
        cy.log('WHEN User clicks search icon')
        cy.get('.header-search-icon').click()
        cy.log('AND types product name into the search input ')
        cy.get('input[aria-label="Search Google Store"]').type(`Google Pixel Buds{enter}`)
        cy.log('THEN produce is presented withing found results')
        cy.get(`a[href="/product/google_pixel_buds"]`).should('exist');
    })
    it('Positive: User is able to find product by name - page object pattern applied, hard coded values', () => {
        cy.log('GIVEN User is at the Accessories Wall page')
        AccessoriesPage.open()

        cy.log('WHEN User clicks search icon')
        AccessoriesPage.performSearch('Google Pixel Buds')

        cy.log('THEN produce is presented withing found results')
        SearchResultsPage.getProductByDocId('google_pixel_buds').should('exist');
    })
    it('Positive: User is able to find product by name - page object pattern applied, values from fixture', () => {
        cy.fixture('product').then(productData => {
            cy.log('GIVEN User is at the Accessories Wall page')
            AccessoriesPage.open()

            cy.log('WHEN User clicks search icon')
            AccessoriesPage.performSearch(productData.name)

            cy.log('THEN produce is presented withing found results')
            SearchResultsPage.getProductByDocId(productData.url).should('exist');
        })
    })
})

describe('Google Market tests', () => {
    before(() => {
        cy.fixture('product').then(testingData => {
            cy.wrap(testingData).as('productData')
        })
    })
    it('Positive: User is able to find product by name - page object pattern applied, values from fixture ' +
        '- using as()', () => {
        cy.log('GIVEN User is at the Accessories Wall page')
        AccessoriesPage.open()
        cy.get('@productData').then((productData) => {
            cy.log('WHEN User clicks search icon')
            AccessoriesPage.performSearch(productData.name)
            cy.log('THEN produce is presented withing found results')
            SearchResultsPage.getProductByDocId(productData.url).should('exist');
        })
    })
})
