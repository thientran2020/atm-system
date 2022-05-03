const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const fs = require('fs')
const DAO = require('./dao')
const UserRepository = require('./user_repository')
const AccountRepository = require('./account_repository')
require('dotenv').config()

// Initialize app server
const app = express()
const port = process.env.PORT || 4040

app.listen(port, () => {    
    console.log(`Server is running at port: ${port}`)
});

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(express.json())


// Check database exists --> then connect
let dbFile = '.data/database.db'
let exists = fs.existsSync(dbFile)
if (!exists) {
    console.log("Database is not created yet...!")
    console.log("Creating database...!")
}

// Initialize Data Access Object
const dao = new DAO(dbFile)
const userRepo = new UserRepository(dao)        // users table
const accountRepo = new AccountRepository(dao)  // accounts table

dao.run(`
    CREATE TABLE IF NOT EXISTS users (
        userID INTEGER PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        address VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        zipCode INT, 
        phoneNumber VARCHAR(255) 
    );
`)

dao.run(`
    CREATE TABLE IF NOT EXISTS accounts (
        userID INT NOT NULL,
        accountType VARCHAR(255) NOT NULL,
        balance DOUBLE NOT NULL, 
        lastTransactionDate VARCHAR(255)
    );
`)

// GET API for data retrieval 
// Users' data
app.get("/showUserDatabase", (req, res) => {
    userRepo.getUsersData().then(data => {
        res.json(data)
    })
})

app.get("/getUsernameByID", (req, res) => {
    let id = req.query.id
    userRepo.getUsernameByID(id).then(data => {
        res.json(data)
    })
})

// Accounts' data
app.get("/getAccountsData", (req, res) => {
    accountRepo.getAccountsData().then(data => {
        res.json(data)
    })
})

app.get("/getAccountByID", (req, res) => {
    let id = req.query.id
    accountRepo.getAccountByID(id).then(data => {
        res.json(data)
    })
})

app.get("/addAccount", (req, res) => {
    let id = req.query.id
    let accountType = req.query.accountType
    let balance = req.query.balance

    accountRepo.addAccount(id, accountType, balance)
    .then(data => {
        res.json({ "message": `Account has been successfully added!`})
    })
})

// User authentication
app.use('/auth/login', (req, res) => {
    res.send({
      token: 'sjsu'
    })
});

app.post('/register', async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        let username = req.body.username
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let phoneNumber = req.body.phoneNumber

        userRepo.getUserByUsername(username)
            .then(user => {
                if (user) {
                    console.log(user)
                    return res.send({ message: "Username already exists...!" })
                }
                userRepo.insertUser(username, hashedPassword, firstName, lastName, phoneNumber)
                .then(data => res.send({ message: "Success" }))
            })
    } catch {
        res.sendStatus(500)
    }
})

const users = [
    {
        username: 'testuser22',
        password: '123',
    },
    {
        username: 'testuser',
        password: '1414'
    }
]

const jwt = require('jsonwebtoken')

app.get('/users', authenticateToken, (req, res) => {
    // retrieve user's data from database and send back request
    // res.json(req.user)
    res.json(users.filter(user => user.username === req.user.name))
})

app.post('/login', async (req, res) => {
    let username = req.body.username
    let password
    await userRepo.getPasswordFromUsername(username)
        .then(data => {
            if (data != null)
                password = data.password
        })
    if (!password) {
        return res.send({ message: 'Invalid username' })
    }
    try {
        if (await bcrypt.compare(req.body.password, password)) {
            const accessToken = jwt.sign({name: username}, process.env.ACCESS_TOKEN_SECRET)
            return res.json({ accessToken: accessToken, message: "Success" })
        } else {
            return res.send({ message: 'Incorrect password' })
        }
    } catch {
        return res.sendStatus(500)
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// showUserDatabase
// getUsernameByID?id=2
// insertUser?id=5&username=testuser5&password=password&firstName=user5&lastName=group&phoneNumber=8317779999
// getAccountsData
// getACcountByID?id=1
// addAccount?id=4&accountType=Saving&balance2900