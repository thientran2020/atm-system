const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = multer({ dest: '.data/transactions/' })
const fs = require('fs')
const DAO = require('./dao')
const UserRepository = require('./user_repository')
const AccountRepository = require('./account_repository')
const TransactionRepository = require('./transaction_repository')
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

// DATABASE
// Initialize Data Access Object
const dao = new DAO(dbFile)
const userRepo = new UserRepository(dao)        // users table
const accountRepo = new AccountRepository(dao)  // accounts table
const transactionRepo = new TransactionRepository(dao) // transactions table

// Comment out lines 46-48 - Save. Run server!
// Next, comment out them again. Save. Rerun server!
// dao.run(`DROP TABLE users`)
// dao.run(`DROP TABLE accounts`)
// dao.run(`DROP TABLE transactions`)

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
        phoneNumber VARCHAR(255),
        pin VARCHAR(9) NOT NULL
    );
`)

dao.run(`
    CREATE TABLE IF NOT EXISTS accounts (
        accountID INTEGER PRIMARY KEY,
        userID INT NOT NULL,
        accountType VARCHAR(255) NOT NULL,
        balance DOUBLE NOT NULL, 
        status INT NOT NULL
    )
`)

dao.run(`
    CREATE TABLE IF NOT EXISTS transactions (
        transactionID INTEGER PRIMARY KEY,
        sender VARCHAR(255) NOT NULL,
        receiver VARCHAR(255) NOT NULL,
        fromAccount VARCHAR(255) NOT NULL, 
        toAccount VARCHAR(255) NOT NULL,
        transactionType VARCHAR(255) NOT NULL,
        transactionDate VARCHAR(255),
        transactionImage VARCHAR(255),
        transactionAmount DOUBLE NOT NULL
    );
`)

// **************** API for data retrieval (development purpose) *************
// Get all users' data
app.get("/getUsersData", (req, res) => {
    userRepo.getUsersData().then(data => {
        res.json(data)
    })
})

app.get("/getUsernameByID", (req, res) => {
    let id = req.query.id
    userRepo.getUsernameByID(id).then(data => {
        res.json(data)
    })
    return res.status(201)
})

// Get all accounts' data
app.get("/getAccountsData", (req, res) => {
    accountRepo.getAccountsData().then(data => {
        res.json(data)
    })
    return res.status(201)
})

// Get all transactions' data
app.get("/getTransactionsData", (req, res) => {
    transactionRepo.getTransactionsData().then(data => {
        res.json(data)
    })
    return res.status(201)
})


// *********** API for frontend fetch ************
// Get user data by username
app.get('/user', authenticateToken, async (req, res) => {
    const username = req.user.name
    await userRepo.getUserByUsername(username)
            .then(data => res.json({ "user": data }))
    return res.status(201)
})

// Update user profile
app.post('/user/update', authenticateToken, async (req, res) => {
    const username = req.body.username
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zipCode = req.body.zipCode
    const phoneNumber = req.body.phoneNumber
    await userRepo.updateUserData(username, address, city, state, zipCode, phoneNumber)
        .then(() => res.json({ "messgge": "Successfully updated...!"}))
    return res.status(201)
})

// Get account data of authorized user
app.get("/account", authenticateToken, (req, res) => {
    const username = req.user.name
    userRepo.getIDByUsername(username).then(
        user => {
            accountRepo.getAccountByID(user.userID).then(
                data => res.json(data)
            )
        }
    )
    return res.status(201)
})

// Add new account for authorized user
app.post("/addAccount", authenticateToken, async (req, res) => {
    const username = req.user.name
    const accountType = req.body.accountType
    const balance = parseFloat(req.body.balance)

    await userRepo.getIDByUsername(username).then(
        user => {
            accountRepo.addAccount(user.userID, accountType, balance)
                .then(() => {
                    accountRepo.getLasAccountID()
                        .then(data => {
                            transactionRepo.newTransaction(username, username, data.accountID, data.accountID, "Newly created", balance)    
                            .then(() => res.json({ message: "Successfully added" }))
                        })
                })

        }
    )
    return res.status(201)
})

// Get account data of authorized user
app.get("/transaction", authenticateToken, (req, res) => {
    transactionRepo.getTransactionsByUsername(req.user.name)
    .then(data => res.json(data))
    return res.status(201)
})

// Close existing account of authorized user
app.post("/closeAccount", authenticateToken, async (req, res) => {
    const sender = req.user.name
    const receiver = req.user.name
    const accountID = req.body.accountID
    
    await accountRepo.getCurrentBalance(accountID)
        .then(data => {
            if (data.balance > 0) {
                transactionRepo.newTransaction(sender, receiver, accountID, accountID, "Cashed Out", data.balance)
                    .then(() => res.send({ message: "Success" }))
            }
            accountRepo.updateBalance(accountID, 0)
            accountRepo.closeAccount(accountID).catch(e => console.log(e))
        })
    return res.status(201)
})

// ************* User registration *************
app.post('/register', async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        let username = req.body.username
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let phoneNumber = req.body.phoneNumber
        let pin = req.body.pin

        userRepo.getUserByUsername(username)
            .then(user => {
                if (user) {
                    return res.send({ message: "Username already exists...!" })
                }
                userRepo.insertUser(username, hashedPassword, firstName, lastName, phoneNumber, pin)
                .then(() => res.send({ message: "You are successfully registed ^^" }))
            })
    } catch {
        res.sendStatus(500)
    }
})

// ************* User Login - authentication & authorization *************
app.post('/login', async (req, res) => {
    let username = req.body.username
    let user = { name: username }
    let password
    await userRepo.getPasswordFromUsername(username)
        .then(data => {
            if (data != null)
                password = data.password
        })

    if (!password) {
        return res.status(401).send({ message: 'Invalid username' })
    }
    
    try {
        if (await bcrypt.compare(req.body.password, password)) {
            const accessToken = generateAccessToken(user)
            res.json({ accessToken: accessToken, message: "Success" })
        } else {
            res.json({ message: 'Incorrect password' })
        }
    } catch {
        res.status(500)
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

// Generate access token when user logs in
// For security, default expiration time is 30 minutes
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

// ************* API for Bank functionalities *************
app.post('/api/image', upload.single('image'), (req, res) => {
    const imagePath = req.file.path
    const transactionID = req.body.transactionID
    transactionRepo.addTransactionImage(imagePath, transactionID)
        .then(() => res.json({ message: "Success" }))
    return res.status(201)
})

app.get('/image', (req, res) => {
    const image = req.query.image
    const readStream = fs.createReadStream(`.data/transactions/${image}`)
    readStream.pipe(res)
    return res.status(201)
})

app.post("/updateAccount", authenticateToken, async (req, res) => {
    const sender = req.user.name
    const receiver = req.user.name
    const fromAccount = req.body.fromAccount
    const toAccount = req.body.toAccount
    const fromAccountNewBalance = req.body.fromAccountNewBalance
    const toAccountNewBalance = req.body.toAccountNewBalance
    const transactionType = req.body.transactionType
    const transactionAmount = req.body.transactionAmount

    await transactionRepo.newTransaction(sender, receiver, fromAccount, toAccount, transactionType, transactionAmount)
        .then(() => {
            accountRepo.updateBalance(fromAccount, fromAccountNewBalance)
            accountRepo.updateBalance(toAccount, toAccountNewBalance)
            transactionRepo.getLastTransactionID()
                .then(id => res.json(id))
        })
    return res.status(201)
})

// ************* API for ATM MACHINE VERSION *************
app.post('/atm/login', async (req, res) => {
    let username = req.body.username
    let pin = req.body.pin
    let isAuthorizedUser = false

    await userRepo.getPinFromUsername(username)
        .then(data => {
            if (data != null)
                isAuthorizedUser = data.pin == pin
        })

    if (!isAuthorizedUser) {
        return res.status(401).send({ message: 'Incorrect username or PIN' })
    }
    
    await userRepo.getUserByUsername(username)
        .then(data => res.json({ user: data }))
    return res.status(201)
})

app.get('/atm/account', async(req, res) => {
    let username = req.query.username
    let pin = req.query.pin

    userRepo.getIDByUsername(username).then(
        user => {
            accountRepo.getAccountByID(user.userID).then(
                data => res.json(data)
            )
        }
    )
    return res.status(201)
})

app.post('/atm/updateAccount', async(req, res) => {
    const sender = req.body.username
    const receiver = req.body.username
    const fromAccount = req.body.fromAccount
    const toAccount = req.body.toAccount
    const fromAccountNewBalance = req.body.fromAccountNewBalance
    const toAccountNewBalance = req.body.toAccountNewBalance
    const transactionType = req.body.transactionType
    const transactionAmount = req.body.transactionAmount

    await transactionRepo.newTransaction(sender, receiver, fromAccount, toAccount, transactionType, transactionAmount)
        .then(() => {
            accountRepo.updateBalance(fromAccount, fromAccountNewBalance)
            accountRepo.updateBalance(toAccount, toAccountNewBalance)
            transactionRepo.getLastTransactionID()
                .then(id => res.json(id))
        })
    return res.status(201)
})