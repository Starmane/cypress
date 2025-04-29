describe('Desktop Home Page Visual Check - Publish', () => {
    const selectors = {
        body: 'body',
    };

    it.skip('should run a Percy snapshot on home page to check for design differences between new code versions', () => {
        cy.visitPublishUrl('/content/regression/us/en.html');

        // Verify the body is visible
        cy.get(selectors.body).should('be.visible');
        
        // Take a Percy snapshot for visual comparison
        cy.percySnapshot();
    });
});