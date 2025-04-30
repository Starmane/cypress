Cypress.Commands.add('visitAuthorUrl', (url) => {
    const username = Cypress.env('authorUsername');
    const password = Cypress.env('authorPassword');

    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);

    cy.visit(Cypress.env('authorUrl') + url, {
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            'ngrok-skip-browser-warning': '69420'
        },
    });
});

Cypress.Commands.add('loginToAEM', () => {
    const username = Cypress.env('authorUsername');
    const password = Cypress.env('authorPassword');

    const params = new URLSearchParams();
    params.append('j_username', username);
    params.append('j_password', password);
    params.append('j_validate', true);
    params.append('_charset_', 'utf-8');

    cy.request({
        method: 'POST',
        url: Cypress.env('authorUrl') + '/libs/granite/core/content/login.html/j_security_check',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': Cypress.env('authorUrl') + '/libs/granite/core/content/login.html?resource=%2Faem%2Fstart.html&$$login$$=%24%24login%24%24&j_reason=unknown&j_reason_code=unknown',
            'ngrok-skip-browser-warning': '69420'
        },
        body: params.toString(),
        form: true
    }).then((response) => {
        expect([200, 302]).to.include(response.status);
        cy.log('Logged in successfully');
    });

});

Cypress.Commands.add('createAEMSite', (pageName,parentPagePath,template) => {
    const username = Cypress.env('authorUsername');
    const password = Cypress.env('authorPassword');

    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);

    cy.request({
        method: 'GET',
        url: Cypress.env('authorUrl') + '/libs/granite/csrf/token.json',
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            'ngrok-skip-browser-warning': '69420'
        }
    }).then((tokenResponse) => {
        expect(tokenResponse.status).to.eq(200);
        const params = new URLSearchParams();
        params.append('_charset_', 'utf-8');
        params.append('./jcr:title', pageName);
        params.append('parentPath', parentPagePath);
        params.append('template', template);
    
        const csrfToken = tokenResponse.body.token;
        cy.request({
            method: 'POST',
            url: Cypress.env('authorUrl') + '/libs/wcm/core/content/sites/createpagewizard/_jcr_content',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': '/mnt/overlay/wcm/core/content/sites/createpagewizard.html' + parentPagePath,
                'Csrf-Token': csrfToken, 
                'ngrok-skip-browser-warning': '69420'
            },
            body: params.toString(),
            form: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Page created successfully!');
        });
    
 });
});


Cypress.Commands.add('replicateAEMPage', (pagePath) => {
    const username = Cypress.env('authorUsername');
    const password = Cypress.env('authorPassword');

    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);

    cy.request({
        method: 'GET',
        url: Cypress.env('authorUrl') + '/libs/granite/csrf/token.json',
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            'ngrok-skip-browser-warning': '69420'
        }
    }).then((tokenResponse) => {
        expect(tokenResponse.status).to.eq(200);
        const params = new URLSearchParams();
        params.append('_charset_', 'utf-8');
        params.append('cmd', 'Activate');
        params.append('path', pagePath);
        params.append('agentId', 'publish');
    
        const csrfToken = tokenResponse.body.token;
        cy.request({
            method: 'POST',
            url: Cypress.env('authorUrl') + '/bin/replicate',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': Cypress.env('authorUrl') + '/sites.html/content/regression/us/en',
                'Csrf-Token': csrfToken, 
                'ngrok-skip-browser-warning': '69420'
            },
            body: params.toString(),
            form: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Page was replicated successfully!');
        });
    
 });
});

Cypress.Commands.add('deleteAEMPage', (pagePath) => {
    const username = Cypress.env('authorUsername');
    const password = Cypress.env('authorPassword');

    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);

    cy.request({
        method: 'GET',
        url: Cypress.env('authorUrl') + '/libs/granite/csrf/token.json',
        headers: {
            Authorization: `Basic ${base64Credentials}`,
            'ngrok-skip-browser-warning': '69420'
        }
    }).then((tokenResponse) => {
        expect(tokenResponse.status).to.eq(200);
        const params = new URLSearchParams();
        params.append('_charset_', 'utf-8');
        params.append('force', 'false');
        params.append('checkChildren', 'true');
        params.append('archive', 'false');
        params.append('cmd', 'deletePage');
        params.append('path', pagePath);

        const csrfToken = tokenResponse.body.token;
        cy.request({
            method: 'POST',
            url: Cypress.env('authorUrl') + '/bin/wcmcommand',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': Cypress.env('authorUrl') + '/sites.html/content/regression/us/en',
                'Csrf-Token': csrfToken, 
                'ngrok-skip-browser-warning': '69420'
            },
            body: params.toString(),
            form: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Page was deleted successfully!');
        });
    
 });
});


Cypress.Commands.add('visitPublishUrl', (url) => {
    const publishBaseUrl = Cypress.env('publishUrl');

    cy.visit(publishBaseUrl + url, {
        headers: {
            'ngrok-skip-browser-warning': '69420'
        },
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    console.error('Uncaught exception:', err);
    return false;
});