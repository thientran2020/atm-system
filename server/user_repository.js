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

    insertUser(id, username, password, firstName, lastName, phoneNumber) {
        let sql = `INSERT INTO users 
            (id, username, password, first_name, last_name, phone_number) 
            VALUES (?, ?, ?, ?, ?, ?)`
        return this.dao.run(sql, [id, username, password, firstName, lastName, phoneNumber])
    }
}

module.exports = UserRepository