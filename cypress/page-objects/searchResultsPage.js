class SearchResultsPage {
    getProductByDocId(href) {
        return cy.get(`a[href="${href}"]`);
    }
}

export default new SearchResultsPage()