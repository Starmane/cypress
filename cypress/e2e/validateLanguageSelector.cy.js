describe('Desktop Language Selector check - Publish', () => {
    const selectors = {
        languageSelector: '#langNavToggleHeader',
        languageMenu: 'ul.cmp-languagenavigation__group',
        languageMenuItem: 'li > ul > li',
        languageLink: 'a',
    };

    it('should validate that the language is working correctly and that all available items lead to a working location', () => {
        cy.visitPublishUrl('/content/regression/us/en.html');

        // Validate that the language selector is visible and click it
        cy.get(selectors.languageSelector).should('be.visible');
        cy.get(selectors.languageSelector).click({ force: true });

        // Verify the language menu is visible and contains 11 items
        cy.get(selectors.languageMenu).should('be.visible');
        cy.get(selectors.languageMenu).find(selectors.languageMenuItem).should('have.length', 11);

        // Check each language menu item is visible and leads to a working link
        cy.get(selectors.languageMenu).each(($li) => {
            cy.wrap($li).should('be.visible');
            cy.wrap($li).find(selectors.languageLink).invoke('text').should('not.be.empty');
            cy.wrap($li).find(selectors.languageLink).should('have.attr', 'href').then((href) => {
                cy.request(href).its('status').should('eq', 200);
            });
        });
    });
});