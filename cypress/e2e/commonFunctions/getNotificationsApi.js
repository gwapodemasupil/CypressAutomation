/// <reference types="cypress" />

import resourceData from "../resourceData/resourceData.js";
const rd = new resourceData

class getNotificationsApi {
    compareNotificationsApiFromDatabase(accessLevel) {
        let apiCredentialClientId = '';
        let apiCredentialClientSecret = '';
        let userApiId = '';
        let accessToken = '';
        let individualApiId = '';

        //Getting random user from database
        const getRandomUser = `select top 1 i.apiid, u.apiid from clients c inner join users u on u.clientid = c.id inner join individuals i on i.id = u.individualid where c.resellerid = 4 and c.status = 'approved' and u.isActive = 1 order by newid()`;
        cy.sqlServer(getRandomUser).then((result) => {
            individualApiId = result[0][0].value
            userApiId = result[0][1].value

            //Getting apicredentials from database
            const getApiCredentials = `select * from ApiCredentials where name = 'WLTH'`;
            cy.sqlServer(getApiCredentials).then((apiCredentials) => {
                apiCredentialClientId = apiCredentials[0][2].value
                apiCredentialClientSecret = apiCredentials[0][3].value
    
                //Generating new access token using the apicredentials from database
                if (accessLevel === 'applevel'){
                    cy.getAppLevelAccessToken(rd.authenticationApiURL, apiCredentialClientId, apiCredentialClientSecret).then((token) => {
                        accessToken = token.body.token_type + ' ' + token.body.access_token
                        this.dbCheckNotificationsApi(accessToken, individualApiId, userApiId)
                    })
                }
                else {
                    cy.getUserLevelAccessToken(rd.authenticationApiURL, apiCredentialClientId, apiCredentialClientSecret, userApiId).then((token) => {
                        accessToken = token.body.token_type + ' ' + token.body.access_token
                        this.dbCheckNotificationsApi(accessToken, individualApiId, userApiId)
                    })
                }
            })
        })
    }

    dbCheckNotificationsApi(accessToken, individualApiId, userApiId) {
        let getUsersByIndividualId = '';

        //Invoking notifications api
        const targetUrl = 'https://stage-api.yakpay.com/notifications/' + individualApiId
        cy.invokeApi('GET', targetUrl, accessToken).then((notif) => {
            expect(notif.status).to.equal(200)

            getUsersByIndividualId = `select i.apiid, u.apiid from users u inner join individuals i on i.id = u.individualid left join clients c on c.id = u.clientid`;
            getUsersByIndividualId += ` where i.apiid = '` + individualApiId + `'`;
            getUsersByIndividualId += ` and c.resellerid = 4`;

            //Getting all users linked to the target individual
            cy.sqlServer(getUsersByIndividualId).then((userList) => {
                if (userList.length > 1)
                {
                    for(var i = 0; i < userList.length; i++)
                    {
                        //comparing database data from api response
                        const currentRow = i
                        assert.equal(userList[currentRow][0].value, notif.body[currentRow].individual_id, 'individual apiid');
                        assert.equal(userList[currentRow][1].value, notif.body[currentRow].user_id, 'user apiid')
                        expect(notif.body[currentRow].notifications.length).to.equal(5)
                    }
                }
                else
                {
                    //comparing database data from api response
                    assert.equal(individualApiId, notif.body[0].individual_id, 'individual apiid');
                    assert.equal(userApiId, notif.body[0].user_id, 'user apiid')
                    expect(notif.body[0].notifications.length).to.equal(5)
                }
            })
        })
    }
    
}

export default getNotificationsApi