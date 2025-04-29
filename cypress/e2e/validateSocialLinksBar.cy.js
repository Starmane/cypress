describe('Desktop Social Links test - Publish', () => {
    const selectors = {
        socialLinksBar: 'div.buildingblock',
        socialLinkButton: 'div.cmp-button--icononly a',
        socialLinkParent: 'div.cmp-button--icononly',
    };

    it('should validate that the social media links are visible and that they point to an existing page', () => {
        cy.visitPublishUrl('/content/regression/us/en.html');

        // Scroll to and verify the social links bar
        cy.get(selectors.socialLinksBar).scrollIntoView();
        cy.get(selectors.socialLinksBar).should('be.visible');
        
        // Validate each social media link
        cy.get(selectors.socialLinksBar).find(selectors.socialLinkButton).parent().then(($li) => {
            cy.wrap($li).should('be.visible');
            cy.wrap($li).find('a').invoke('text').should('not.be.empty');
            cy.wrap($li).find('a').should('have.attr', 'href').then((href) => {
                cy.request(href).its('status').should('eq', 200);
            });
        });
    });
});