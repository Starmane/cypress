describe('Mobile navigation bar items test - Publish', () => {
    const selectors = {
        navigationMenuButton: 'i.wkndicon-menu',
        navigationBarItems: '#mobileNav li.cmp-navigation__item--level-1',
        navigationLink: 'a',
    };

    it('should have a visible mobile navigation bar with four navigation elements (excluding home item) and all buttons should have a valid working link', () => {
        cy.viewport('iphone-6');
        cy.visitPublishUrl('/content/regression/us/en.html');

        // Open the mobile navigation menu
        cy.get(selectors.navigationMenuButton).click({ force: true });
        
        // Verify the mobile navigation bar contains four items
        cy.get(selectors.navigationBarItems).should('have.length', 4);

        // Check that each navigation item is visible and has a valid link
        cy.get(selectors.navigationBarItems).each(($li) => {
            cy.wrap($li).should('be.visible');
            cy.wrap($li).find(selectors.navigationLink).invoke('text').should('not.be.empty');
            cy.wrap($li).find(selectors.navigationLink).should('have.attr', 'href').then((href) => {
                cy.request(href).its('status').should('eq', 200);
            });
        });
    });
});