/// <reference types="cypress" />

const mysql = require("mysql");

class commonFunctions {

    /*queryTestDb(query, config) {
        const connection = mysql.createConnection(config.env.db);
        connection.connect();
    
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) reject(error);
                else
                {
                    connection.end();
                    return resolve(results);
                }
            })
        });
    }*/
}

export default commonFunctions