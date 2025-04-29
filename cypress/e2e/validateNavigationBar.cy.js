describe('Desktop navigation bar items test - Publish', () => {
    const selectors = {
        navigationBarItems: 'div.navigation.cmp-navigation--header nav li.cmp-navigation__item--level-1',
        navigationLink: 'a',
    };

    it('should have visible desktop navigation bar with four navigation elements and all buttons should have a valid working link', () => {
        cy.visitPublishUrl('/content/regression/us/en.html');

        // Verify the navigation bar contains four items
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