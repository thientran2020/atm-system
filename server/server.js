const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4040;

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});