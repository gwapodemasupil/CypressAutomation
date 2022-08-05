const sql = require("mssql")

const config = {
    server: "tcp:paymentlogic.database.windows.net,1433",
    user: "sql_Arvin",
    password: "ONU0ZyLGbsAGqxR",
    database: "PaymentLogicSTG",
    options: {
        enableArithAbort: true,
    },
    connectionTimeout: 150000,
    pool: {
        max: 20, 
        min: 0,
        idleTimeoutMillis: 30000,
    },
    trusted_connection: false,
    encrypt: true,
    TrustServerCertificate: true,
    providerName: "System.Data.SqlClient"
};

/*sql.on('error', err => {
    console.log(err.message)
})*/

async function getDbUserAsuncFunction() {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request().query('select top 1 * from clients order by newid()');
        console.log(result1);
        sql.close();
    }
    catch (error) {
        console.log(err.message);
        sql.close();
    }
}

getDbUserAsuncFunction();