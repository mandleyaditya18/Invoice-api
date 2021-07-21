const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    invoiceNo: String,
    invoiceDate: {
        type: Date,
        default: Date.now
    },
    orgName: String,
    orgAddress: String,
    orgContact : {
        email: String,
        mobile: Number
    },
    work: {
        hours: Number,
        rate: Number,
        amount: Number
    },
    expenses: {
        materials: [
            {
                name: String,
                quantity: Number,
                rate: Number,
                amount: Number
            }
        ],
        laborAmount: Number
    },
    total: Number,
    paymentMode: [],
    dueDate: Date,
    status: [paid, outstanding, late],
    lateFeeRate: Number,
    notes: []
});

module.exports = mongoose.model('Invoice', invoiceSchema);