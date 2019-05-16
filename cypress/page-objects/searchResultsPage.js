class SearchResultsPage {
    getProductByDocId(docId) {
        return cy.get(`a[href="/product/${docId}"]`);
    }
}

export default new SearchResultsPage()