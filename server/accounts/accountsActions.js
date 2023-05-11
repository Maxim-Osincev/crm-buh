const sqlConfig = require('../sqlConfig.js');
const pool = sqlConfig.pool;

const getAccounts = (req, res) => {
    pool.query(
        'SELECT * FROM `accounts`',
        function(err, results, fields) {
            res.send(results);
        }
    );
}
const addAccount = (req, res) => {
    const { currency, currentValue, accountName } = req.body;
    pool.query(
        `INSERT INTO accounts (currency, currentValue, accountName) VALUES ('${currency}', ${currentValue}, '${accountName}')`,
        function(err, results, fields) {
            getAccounts(req, res);
        }
    );
}
const deleteAccount = (req, res) => {
    const { id } = req.body;
    pool.query(
        `DELETE FROM accounts WHERE id = ${id}`,
        function(err, results, fields) {
            getAccounts(req, res);
        }
    );
}
const editAccount = (req, res) => {
    const { id } = req.params;
    const { accountName } = req.body;
    pool.query(
        `UPDATE accounts SET accountName = '${accountName}' WHERE id = ${id}`,
        function(err, results, fields) {
            getAccounts(req, res);
        }
    );
}

module.exports = {
    getAccounts,
    addAccount,
    deleteAccount,
    editAccount,
}
