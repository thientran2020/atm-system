class AccountRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAccountsData() {
        let sql = `SELECT * FROM accounts`
        return this.dao.all(sql)
    }

    getAccountByID(userID) {
        let sql = `SELECT * FROM accounts WHERE userID = ? AND status = 1`
        return this.dao.all(sql, [userID])
    }

    addAccount(userID, accountType, balance) {
        let status = 1
        let sql = `INSERT INTO accounts 
            (userID, accountType, balance, status) 
            VALUES (?, ?, ?, ?)`
        return this.dao.run(sql, [userID, accountType, balance, status])
    }

    closeAccount(accountID) {
        let status = -1
        let sql = `UPDATE accounts SET status = ? WHERE accountID = ?`
        return this.dao.run(sql, [status, accountID])
    }

    updateBalance(accountID, newBalance) {
        let sql = `UPDATE accounts SET balance = ? WHERE accountID = ?`
        return this.dao.run(sql, [newBalance, accountID])
    }

    getCurrentBalance(accountID) {
        let sql = `SELECT balance FROM accounts WHERE accountID = ?`
        return this.dao.get(sql, [accountID])
    }

    getLasAccountID() {
        let sql = `SELECT accountID FROM accounts ORDER BY accountID DESC LIMIT 1`
        return this.dao.get(sql)
    }
}

module.exports = AccountRepository