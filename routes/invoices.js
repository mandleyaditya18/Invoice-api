const express = require('express');
const router = express.Router();
const invoices = require('../controllers/invoices');

router.route('/')
    .get(invoices.index)
    .post(invoices.createInvoice)

module.exports = router;