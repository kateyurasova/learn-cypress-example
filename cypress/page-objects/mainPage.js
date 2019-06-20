class MainPage {
    open() {
        cy.visit(`${Cypress.env('iherbURL')}`);
    }

    get searchInput () {
        return cy.get('#txtSearch');
    }

    performSearch(productToSearch) {
        this.searchInput.type(`${productToSearch}{enter}`);
    }
}

export default new MainPage()