'use strict'
const express = require('express')
const app = express()
const config = require('./config.json')
const login = require('./routers/login')
const register = require('./routers/register')
const railway = require('./routers/railway')
const payment = require('./routers/payment')
const gov = require('./routers/gov')
const user = require('./routers/user')
const contact = require('./routers/contact')
const mongoose = require('mongoose')

const trainModel = require('../services/model/train')

mongoose.connect(config.mongoDB, { useNewUrlParser: true }, function (err) {
    if (err) throw err
    console.log('mongo db connected')
});

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//  statis start
// Create static records
const staticTrainRecords = [
    {
        name: 'Train 1',
        route: 'Route A',
    },
    {
        name: 'Train 2',
        route: 'Route B',
    },
    {
        name: 'Train 3',
        route: 'Route C',
    },
    // Add more static records here
];
// Function to insert static records into the database
async function insertStaticRecords() {
    try {
        const insertedRecords = await trainModel.insertMany(staticTrainRecords);
        console.log(`${insertedRecords.length} records inserted successfully`);
    } 
    catch (error) {
        console.error('Error inserting records:', error);
    } 
}

//   insertStaticRecords().catch((err) => console.error(err));  
// end

app.use(login)
app.use(register)
app.use(railway)
app.use(payment)
app.use(gov)
app.use(user)
app.use(contact)

app.listen(3001, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('app listening on port 3001')
});