class AccessoriesPage {
    open() {
        cy.visit(`${Cypress.env('googleURL')}`);
    }

    get searchInput () {
        return cy.get('#txtSearch');
    }

    performSearch(productToSearch) {
        this.searchInput.type(`${productToSearch}{enter}`);
    }
}

export default new AccessoriesPage()