class TransactionRepository {
    constructor(dao) {
        this.dao = dao
    }

    getTransactionsData() {
        let sql = `SELECT * FROM transactions`
        return this.dao.all(sql)
    }

    newTransaction(sender, receiver, fromAccount, toAccount, transactionType) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let sql = `INSERT INTO transactions 
            (sender, receiver, fromAccount, toAccount, transactionType, transactionDate) 
            VALUES (?, ?, ?, ?, ?, ?)`
        return this.dao.run(sql, [sender, receiver, fromAccount, toAccount, transactionType, dateTime])
    }


    atmDepositeNewTransaction(sender, receiver, toAccount, transactionType) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let sql = `INSERT INTO transactions 
            (sender, receiver, fromAccount, toAccount, transactionType, transactionDate) 
            VALUES (?, ?, ?, ?, ?, ?)`
        return this.dao.run(sql, [sender, receiver, toAccount, transactionType, dateTime])
    }
}

module.exports = TransactionRepository