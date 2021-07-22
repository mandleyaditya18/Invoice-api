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
    name: String,
    email: String,
    address: String,
    phone: Number,
    work: {
        hours: Number,
        rate: Number,
        amount: {
            type: Number,
            default: function() {
                return this.hours * this.rate
            }
        }
    },
    expenses: {
        materials: [
            {
                name: String,
                quantity: Number,
                rate: Number,
                amount: {
                    type: Number,
                    default: function() {
                        return this.quantity * this.rate
                    }
                }
            }
        ],
        laborAmount: Number
    },
    total: Number,
    paymentMode: {
        type: String,
        enum: ['debit card', 'credit card', 'net banking', 'cheque', 'demand draft', 'upi'],
        lowercase: true
    },
    dueDate: Date,
    status: {
        type: String,
        enum: ['pending', 'paid'],
        lowercase: true
    },
    lateFeeRate: Number,
    notes: [String]
});

module.exports = mongoose.model('Invoice', invoiceSchema);