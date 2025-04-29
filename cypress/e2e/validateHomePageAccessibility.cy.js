describe('Desktop Home Page Accessibility check - Publish', () => {
    const selectors = {
        pageUrl: '/content/regression/us/en.html',
    };

    it('should run an accessibility check with axe core and check that the home page has 0 critical accessibility issues', () => {
        cy.visitPublishUrl(selectors.pageUrl);
        cy.injectAxe();

        // Run accessibility check for critical issues
        cy.checkA11y(null, {
            includedImpacts: ['critical'],
        });
    });
});