const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",
    user: "root",
    database: "crm-buh",
    password: ""
});

module.exports = {
    pool,
}
