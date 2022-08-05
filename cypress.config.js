const { defineConfig } = require("cypress");
const sqlServer = require('cypress-sql-server');

module.exports = defineConfig({
  projectId: "5thqrm",
  e2e: {
    setupNodeEvents(on, config) {
      tasks = sqlServer.loadDBPlugin(config.env.db)
      on('task', tasks);
      return tasks
    },
  },
  env: {
    db: {
      userName: "sql_Arvin",
      password: "ONU0ZyLGbsAGqxR",
      server: "paymentlogic.database.windows.net",
      options: {
        database: "PaymentLogicSTG",
        encrypt: true,
        rowCollectionOnRequestCompletion : true
      }

    }
  },
  clientCertificates: [
    {
      url: 'https://stage-api.yakpay.com',
      certs: [
        {
          pfx: 'cypress/certificates/YAKPAY-API-STAGING.pfx',
          passphrase: 'cypress/certificates/stage-pfx_passphrase.txt'
        },
      ],
    },
  ]
});
