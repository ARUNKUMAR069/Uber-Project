
const dotenv = require('dotenv')
dotenv.config()
const connectToDb =require('./db/db')
const express = require('express')
const cors = require('cors')
const app = express()
// Cors helps us to only recive the req from the only domain which is in it
connectToDb()
app.use(cors());








app.get('/', (req, res) => {
    res.send('Welcome API is running of Uber Project')
});



module.exports = app