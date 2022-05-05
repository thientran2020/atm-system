class AccountRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAccountsData() {
        let sql = `SELECT * FROM accounts`
        return this.dao.all(sql)
    }

    getAccountByID(id) {
        let sql = `SELECT * FROM accounts WHERE userID = ?`
        return this.dao.all(sql, [id])
    }

    addAccount(userID, accountType, balance) {
        let sql = `INSERT INTO accounts 
            (userID, accountType, balance) 
            VALUES (?, ?, ?)`
        return this.dao.run(sql, [userID, accountType, balance])
    }

    getTotalNumberOfAccounts() {
        let sql = `SELECT COUNT(*) FROM accounts`
        return this.dao.get(sql)
    }
}

module.exports = AccountRepository