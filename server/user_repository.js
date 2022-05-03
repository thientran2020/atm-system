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

    insertUser(username, password, firstName, lastName, phoneNumber) {
        let sql = `INSERT INTO users 
            (username, password, firstName, lastName, phoneNumber) 
            VALUES (?, ?, ?, ?, ?)`
        return this.dao.run(sql, [username, password, firstName, lastName, phoneNumber])
    }

    getPasswordFromUsername(username) {
        let sql = `SELECT password FROM users WHERE username = ? LIMIT 1`
        return this.dao.get(sql, [username])
    }

    getUserByUsername(username) {
        let sql = `SELECT * FROM users WHERE username = ?`
        return this.dao.get(sql, [username])
    }
}

module.exports = UserRepository