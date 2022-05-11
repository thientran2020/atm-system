class TransactionRepository {
    constructor(dao) {
        this.dao = dao
    }

    getTransactionsData() {
        let sql = `SELECT * FROM transactions`
        return this.dao.all(sql)
    }

    getTransactionsByUsername(username) {
        let sql = `SELECT * FROM transactions WHERE sender = ? OR receiver = ?`
        return this.dao.all(sql, [username, username])
    }

    newTransaction(sender, receiver, fromAccount, toAccount, transactionType, transactionAmount) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let sql = `INSERT INTO transactions 
            (sender, receiver, fromAccount, toAccount, transactionType, transactionDate, transactionAmount) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`
        return this.dao.run(sql, [sender, receiver, fromAccount, toAccount, transactionType, dateTime, transactionAmount])
    }

    addTransactionImage(imagePath, transactionID) {
        let sql = `UPDATE transactions 
            SET transactionImage = ? 
            WHERE transactionID = ?`
        return this.dao.run(sql, [imagePath, transactionID])
    }

    getLastTransactionID() {
        let sql = `SELECT transactionID FROM transactions ORDER BY transactionID DESC LIMIT 1`
        return this.dao.get(sql)
    }
}

module.exports = TransactionRepository