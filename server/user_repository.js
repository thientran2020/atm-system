class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsersData() {
        let sql = `SELECT * FROM users`
        return this.dao.all(sql)
    }

    getUsernameByID(id) {
        let sql = `SELECT * FROM users WHERE id = ?`
        return this.dao.get(sql, [id])
    }

    insertUser(username, password, firstName, lastName, address, phoneNumber) {
        let sql = `INSERT INTO users 
            (username, password, firstName, lastName, address, phoneNumber) 
            VALUES (?, ?, ?, ?, ?, ?)`
        return this.dao.run(sql, [username, password, firstName, lastName, address, phoneNumber])
    }

    authenticateUser(username, password) {
        let sql = `SELECT * FROM users WHERE username = ? AND password = ?`
        return this.dao.get(sql, [username, password])
    }
}

module.exports = UserRepository