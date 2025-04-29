describe('Desktop search bar test - Publish', () => {
    const selectors = {
        searchBar: 'input.cmp-search__input',
        searchResults: 'div.cmp-search__results',
        searchResultLink: 'div.cmp-search__results > a',
    };

    it('should be possible to find an existing Adventures page through the search box', () => {
        cy.visitPublishUrl('/content/regression/us/en.html');

        // Enter search term and verify results visibility
        cy.get(selectors.searchBar).type('Adventures');
        cy.get(selectors.searchResults).should('be.visible');
        
        // Ensure 'Adventures' link exists in search results
        cy.get(selectors.searchResults).contains('Adventures').should('have.attr', 'href');
        
        // Validate the link and its status
        cy.get(selectors.searchResults).contains('Adventures').parent().parent().then(($li) => {
            cy.wrap($li).should('be.visible');
            cy.wrap($li).find(selectors.searchResultLink).invoke('text').should('not.be.empty');
            cy.wrap($li).find(selectors.searchResultLink).should('have.attr', 'href').then((href) => {
                cy.request(href).its('status').should('eq', 200);
            });
        });
    });
});