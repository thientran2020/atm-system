class AccountRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAccountsData() {
        let sql = `SELECT * FROM accounts`
        return this.dao.all(sql)
    }

    getAccountByID(id) {
        let sql = `SELECT * FROM accounts WHERE user_id = ?`
        return this.dao.get(sql, [id])
    }

    addAccount(userID, accountType, balance) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let sql = `INSERT INTO accounts 
            (user_id, account_type, balance, last_transaction_date) 
            VALUES (?, ?, ?, ?)`
        return this.dao.run(sql, [userID, accountType, balance, dateTime])
    }
}

module.exports = AccountRepository