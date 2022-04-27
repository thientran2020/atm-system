const express = require('express');
const cors = require('cors');
const fs = require('fs');
const DAO = require('./dao')
const UserRepository = require('./user_repository')
const AccountRepository = require('./account_repository')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4040;
let dbFile = '.data/database.db';
let exists = fs.existsSync(dbFile);

if (!exists) {
    console.log("Database is not created yet...!")
    console.log("Creating database...!")
    
}

const dao = new DAO(dbFile)
const userRepo = new UserRepository(dao)
const accountRepo = new AccountRepository(dao)

app.listen(port, () => {    
    console.log(`Server is running at port: ${port}`);
});

app.use(cors({
    origin: "http://localhost:4040",
}))

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

app.get("/insertUser", (req, res) => {
    let id = req.query.id
    let username = req.query.username
    let password = req.query.password
    let firstName = req.query.firstName
    let lastName = req.query.lastName
    let phoneNumber = req.query.phoneNumber

    userRepo.insertUser(id, username, password, firstName, lastName, phoneNumber)
    .then(data => {
        res.json({ "message": `${username} has been successfully added!`})
    })
})

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

app.get("/showDate", (req, res) => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    res.json(dateTime)
})

// showUserDatabase
// getUsernameByID?id=2
// insertUser?id=5&username=testuser5&password=password&firstName=user5&lastName=group&phoneNumber=8317779999
// getAccountsData
// getACcountByID?id=1
// addAccount?id=4&accountType=Saving&balance2900