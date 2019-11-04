import SearchResultsPage from "../../page-objects/searchResultsPage"
import MainPage from "../../page-objects/mainPage"

describe('Google Market tests', () => {
    it('Positive: User is able to find product by name - page object pattern applied, values from fixture', () => {
        cy.fixture('product').then(productData => {
            MainPage.open()
            cy.log('WHEN User clicks search icon')
            MainPage.performSearch(productData.name)
            cy.log('THEN produce is presented withing found results')
            SearchResultsPage.getProductByDocId(productData.url).should('exist')
        })
    })
})