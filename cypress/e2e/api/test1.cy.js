/// <reference types="cypress" />

import commonFunctions from "../commonFunctions/commonFunctions.js";
import resourceData from "../resourceData/resourceData.js";
import getNotificationsApi from "../commonFunctions/getNotificationsApi";

const cf = new commonFunctions
const rd = new resourceData
const gna = new getNotificationsApi

describe('check notifications api', () => {
    it.only ('via app level access token', () => {
        gna.compareNotificationsApiFromDatabase('applevel')
    })

    it.only ('via user level access token', () => {
        gna.compareNotificationsApiFromDatabase('userlevel')
    })
})