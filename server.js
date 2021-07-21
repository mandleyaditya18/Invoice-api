const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const invoiceRoute = require('./routes/invoices');

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

app.use('/', invoiceRoute);

app.get('/', (req, res) => {
    res.send('Connection successful');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
})