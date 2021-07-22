const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const invoiceRoute = require('./routes/invoices');
const { checkDues } = require('./middleware');

const app = express();

const DB = process.env.DB_HOST;
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection Open!!!')
    })
    .catch(err => {
        console.log(`Mongo Error: ${err}`)
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let hours = 24;
let mins = 60;

setInterval(() => {
    checkDues();
}, hours * mins * 60 * 1000)

app.use('/', invoiceRoute);

app.get('/', (req, res) => {
    res.send('Connection successful');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
})