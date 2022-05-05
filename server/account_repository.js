class AccountRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAccountsData() {
        let sql = `SELECT * FROM accounts`
        return this.dao.all(sql)
    }

    getAccountByID(userID) {
        let sql = `SELECT * FROM accounts WHERE userID = ?`
        return this.dao.all(sql, [userID])
    }

    addAccount(userID, accountType, balance) {
        let sql = `INSERT INTO accounts 
            (userID, accountType, balance) 
            VALUES (?, ?, ?)`
        return this.dao.run(sql, [userID, accountType, balance])
    }

    closeAccount(accountID) {
        let sql = `DELETE FROM accounts WHERE accountID = ?`
        return this.dao.run(sql, [accountID])
    }

    updateBalance(accountID, newBalance) {
        let sql = `UPDATE accounts SET balance = ? WHERE accountID = ?`
        return this.dao.run(sql, [newBalance, accountID])
    }

    transfer(fromAccountID, toAccountID, amount) {

    }

    getCurrentBalance(accountID) {
        let sql = `SELECT balance FROM accounts WHERE accountID = ?`
        return this.dao.get(sql, [accountID])
    }

    getTotalNumberOfAccounts() {
        let sql = `SELECT COUNT(*) FROM accounts`
        return this.dao.get(sql)
    }
}

module.exports = AccountRepository