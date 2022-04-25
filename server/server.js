const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const { callbackify } = require('util');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4040;
let dbFile = '.data/database.db';
let exists = fs.existsSync(dbFile);
var db = new sqlite3.Database(dbFile, (err) => {
    if (err) return console.error(err.message);
    console.log("Database is successfully connected...!")
});

app.listen(port, () => {    
    console.log(`Server is running at port: ${port}`);
});

app.use(cors({
    origin: "http://localhost:3000",
}));

app.get('/customer',(req,res)=>{
 const customers =[
{name:"John Lopez", add: "200  Washington Sq", add2:" San Jose",add3:" CA",add4:" 95192" , phone: "408-999-9958"}

 ]

res.send(customers)

})

// Testing query
let sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    } )
})