const express = require('express');
const router = express.Router();
const invoices = require('../controllers/invoices');

router.route('/')
    .get(invoices.index)
    .post(invoices.createInvoice)

router.route('/:id')
    .get(invoices.showInvoice)
    .patch(invoices.updateInvoice)

module.exports = router;