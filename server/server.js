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
        let address = req.body.address
        let phoneNumber = req.body.phoneNumber
        userRepo.insertUser(username, hashedPassword, firstName, lastName, address, phoneNumber)
        .then(data => res.json({data}))
    } catch {
        res.sendStatus(500)
    }
})

app.post('/users/login', (req, res) => {
    try {
        userRepo.authenticateUser(req.body.username, req.body.password)
        .then(data => {
            console.log("....!!!")
            console.log(data)
            if (data == null) {
                res.status(403).send()
            }
            res.json(data)
        })
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
    
})


// showUserDatabase
// getUsernameByID?id=2
// insertUser?id=5&username=testuser5&password=password&firstName=user5&lastName=group&phoneNumber=8317779999
// getAccountsData
// getACcountByID?id=1
// addAccount?id=4&accountType=Saving&balance2900