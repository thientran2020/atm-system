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

    getIDByUsername(username) {
        let sql = `SELECT userID FROM users WHERE username = ?`
        return this.dao.get(sql, [username])
    }

    insertUser(username, password, firstName, lastName, phoneNumber, pin) {
        let sql = `INSERT INTO users 
            (username, password, firstName, lastName, phoneNumber, pin) 
            VALUES (?, ?, ?, ?, ?, ?)`
        return this.dao.run(sql, [username, password, firstName, lastName, phoneNumber, pin])
    }

    getPasswordFromUsername(username) {
        let sql = `SELECT password FROM users WHERE username = ? LIMIT 1`
        return this.dao.get(sql, [username])
    }

    getPinFromUsername(username) {
        let sql = `SELECT pin FROM users WHERE username = ? LIMIT 1`
        return this.dao.get(sql, [username])
    }

    getUserByUsername(username) {
        let sql = `SELECT * FROM users WHERE username = ?`
        return this.dao.get(sql, [username])
    }

    updateUserData(username, address, city, state, zipCode, phoneNumber) {
        let sql = `UPDATE users 
                SET address = ?, city = ?, state = ?, zipCode = ?, phoneNumber = ?
                WHERE username = ?`
        return this.dao.run(sql, [address, city, state, zipCode, phoneNumber, username])
    }
}

module.exports = UserRepository