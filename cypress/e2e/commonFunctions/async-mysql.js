const mysql = require ("mysql")

const config = {
    host: "tcp:paymentlogic.database.windows.net",
    port: 1433,
    user: "sql_Arvin",
    password: "ONU0ZyLGbsAGqxR",
    database: "PaymentLogicSTG",
    connectionTimeout: 150000,
    trusted_connection: false,
    encrypt: true,
    TrustServerCertificate: true,
    providerName: "System.Data.SqlClient"
};

let con = mysql.createConnection()

let getQuery = "Select top 1 * from users order by newid()"
con.connect(err => {
    if(err) console.log(err.message)
    else console.log("connected")
})