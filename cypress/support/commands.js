// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getUserLevelAccessToken', (apiUrl, clientId, clientSecret, apiId) => {
    return cy.request({
        method: 'POST',
        url: apiUrl,
        headers: {
            'authorization' : 'Basic  ' + btoa(clientId + ':' + clientSecret),
        },
        form: true,
        body: {
            grant_type: 'password',
            user_id: apiId,
        }
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('getAppLevelAccessToken', (apiUrl, clientId, clientSecret) => {
    return cy.request({
        method: 'POST',
        url: apiUrl,
        headers: {
            'authorization' : 'Basic  ' + btoa(clientId + ':' + clientSecret),
        },
        form: true,
        body: {
            grant_type: 'client_credentials',
        }
    }).then((response) => {
        return response
    })
})

/*Cypress.Commands.add('getAccessToken', (accessLevel, userId, apiUrl, clientId, clientSecret) => {
    let grantType = '';

    if (accessLevel === 'applevel'){
        grantType = 'client_credentials';
    }
    else {
        grantType = 'password';
    }

    return cy.request({
        method: 'POST',
        url: apiUrl,
        headers: {
            'authorization' : 'Basic  ' + btoa(clientId + ':' + clientSecret),
        },
        form: true,
        body: {
            grant_type: grantType,
            user_id: userId,
        }
    }).then((response) => {
        return response
    })
})*/

Cypress.Commands.add('invokeApi', (method, apiUrl, token) => {
    return cy.request({
        method: method,
        url: apiUrl,
        headers: {
            'authorization': token
        },
        form: true
    }).then((response) => {
        return response
    })

})

Cypress.Commands.add('sqlServer', (query) => {
    if (!query) {
      throw new Error('Query must be set');
    }
  
    cy.task('sqlServer:execute', query).then(response => {
      return response
    });
});