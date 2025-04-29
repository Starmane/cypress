describe('Desktop Content distribution of configured component - Author & Publish', () => {
    const selectors = {
        secondaryActionBar: '._coral-ActionBar-secondary > :nth-child(2) > .editor-GlobalBar-item',
        overlayContainer: '.cq-Overlay--container > .cq-Overlay',
        editableToolbar: '#EditableToolbar',
        insertComponentButton: '[title="Insert component"]',
        insertComponentList: 'coral-list.InsertComponentDialog-list',
        draggableDroptarget: '.cq-draggable > .cq-droptarget',
        configureButton: '[title="Configure"]',
        openDialog: 'coral-dialog.is-open',
        tablist: 'coral-dialog.is-open coral-tablist',
        titleFromPageCheckbox: 'coral-dialog.is-open coral-checkbox[name="./titleFromPage"]',
        descriptionFromPageCheckbox: 'coral-dialog.is-open coral-checkbox[name="./descriptionFromPage"]',
        pretitleInput: 'coral-dialog.is-open input[name="./pretitle"]',
        titleInput: 'coral-dialog.is-open input[name="./jcr:title"]',
        descriptionDiv: 'coral-dialog.is-open div[name="./jcr:description"]',
        assetTab: 'coral-dialog.is-open coral-tablist',
        imageFromPageCheckbox: 'coral-dialog.is-open coral-checkbox[name="./imageFromPageImage"]',
        fileUploadButton: 'coral-dialog.is-open coral-fileupload[name="./file"]',
        dialogContent: 'coral-dialog.is-open coral-dialog-content',
        imageCheckbox: 'coral-dialog.is-open coral-dialog-content coral-columnview-item[title="Climber Gear Ropeclimber-gear-rope.jpg"] > coral-checkbox',
        selectButton: 'coral-dialog.is-open coral-dialog-content button:contains("Select")',
        fileUploadFilled: 'coral-dialog.is-open coral-fileupload[name="./file"]',
        altValueFromDAMInput: 'coral-dialog.is-open input[name="./altValueFromDAM"]',
        altInput: 'coral-dialog.is-open input[name="./alt"]',
        doneButton: 'coral-dialog.is-open button:contains("Done")',
        teaser: 'div.cmp-teaser',
        teaserPretitle: 'div.cmp-teaser .cmp-teaser__pretitle',
        teaserTitle: 'div.cmp-teaser .cmp-teaser__title',
        teaserDescription: 'div.cmp-teaser .cmp-teaser__description > p',
        teaserImage: 'div.cmp-teaser .cmp-teaser__image img'
    };

    const pagePath = '/content/regression/us/en/distribution-flow-test-page';
    const pageTemplate = '/conf/wknd/settings/wcm/templates/content-page-template';
    const siteParent = '/content/regression/us/en';

    it('should validate that component can be placed on a page, configured and distributed to publish instance', () => {
        cy.loginToAEM();
        cy.createAEMSite('distribution-flow-test-page', siteParent, pageTemplate);
        // Open the page in Author mode
        cy.visitAuthorUrl(`/editor.html${pagePath}.html`);
        cy.get(selectors.secondaryActionBar).should('have.class', 'is-selected');
        cy.get(selectors.overlayContainer).click({ force: true });
        cy.get(selectors.editableToolbar).should('have.css', 'display', 'block');

        // Insert and configure Teaser component
        cy.get(selectors.insertComponentButton).click({ force: true });
        cy.get(selectors.insertComponentList).contains('Teaser').click({ force: true });
        cy.get(selectors.draggableDroptarget).click({ force: true });
        cy.get(selectors.editableToolbar).should('have.css', 'display', 'block');
        cy.get(selectors.configureButton).click({ force: true });
        cy.get(selectors.openDialog).should('be.visible');
        
        // Fill in Teaser text fields
        cy.get(selectors.tablist).contains('Text').click({ force: true });
        cy.get(selectors.titleFromPageCheckbox).click({ force: true });
        cy.get(selectors.descriptionFromPageCheckbox).click({ force: true });
        cy.get(selectors.pretitleInput).type('Some custom component pre-title', { force: true });
        cy.get(selectors.titleInput).clear().type('Some custom component title', { force: true });
        cy.get(selectors.descriptionDiv).type('Some custom component description', { force: true });

        // Upload and configure image
        cy.get(selectors.assetTab).contains('Asset').click({ force: true });
        cy.get(selectors.imageFromPageCheckbox).click({ force: true });
        cy.get(selectors.fileUploadButton).contains('Pick').click({ force: true });
        cy.get(selectors.dialogContent).should('be.visible');
        cy.get(selectors.imageCheckbox).click({ force: true });
        cy.get(selectors.selectButton).click({ force: true });
        cy.get(selectors.fileUploadFilled).should('have.class', 'is-filled');
        cy.get(selectors.altValueFromDAMInput).uncheck();
        cy.get(selectors.altInput).should('not.be.disabled').clear().type('Some custom image alt description', { force: true });
        cy.get(selectors.doneButton).click({ force: true });

        // Publish the page
        cy.replicateAEMPage(pagePath);


        // Validate the component on Publish
        cy.visitPublishUrl(`${pagePath}.html`);
        cy.get(selectors.teaserPretitle).should('have.text', 'Some custom component pre-title');
        cy.get(selectors.teaserTitle).should('include.text', 'Some custom component title');
        cy.get(selectors.teaserDescription).should('have.text', 'Some custom component description');
        cy.get(selectors.teaserImage).should('have.attr', 'src');
        cy.get(selectors.teaserImage).should('have.attr', 'alt', 'Some custom image alt description');

        cy.deleteAEMPage(pagePath);

    });
});