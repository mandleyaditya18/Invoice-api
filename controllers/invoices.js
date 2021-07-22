const Invoice = require('../models/invoice');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
})

module.exports.index = async (req, res) => {
    try {
        const invoices = await Invoice.find({});
        res.send(invoices);
    }
    catch (err) {
        const error = {error: err};
        res.send(error);
    }
}

module.exports.createInvoice = async (req, res) => {
    try {
        const dueDate = new Date() + 1*60000;
        const {
            invoiceNo, orgName,
            orgAddress, orgContact, name, 
            email, address, phone, work,
            expenses, total, paymentMode,
            status, lateFeeRate, notes
        } = req.body;

        work.amount = work.hours * work.rate;

        const newInvoice = await Invoice.create({
            invoiceNo, orgName, orgAddress, 
            orgContact, name, email, address, 
            phone, work, expenses, total, paymentMode,
            dueDate, status, lateFeeRate, notes
        })
        console.log(typeof(due));

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: `${newInvoice.email}`,
            subject: 'Invoice',
            text: `${newInvoice}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            sent = true;
            }
        });

        res.send(newInvoice);
    }

    catch (err) {
        const error = {error: err};
        res.send(error);
    }
}

module.exports.showInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        res.send(invoice);
    }
    catch (err) {
        const error = {error: err};
        res.send(error);
    }
}

module.exports.updateInvoice = async (req, res) => {
    try{
        const { id } = req.params;
        const value = req.body;
        const invoice = await Invoice.findByIdAndUpdate(id, value, {new: true})
        await invoice.save();

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: `${invoice.email}`,
            subject: 'Updated Invoice',
            text: `${invoice}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            sent = true;
            }
        });

        res.send(invoice);
    }
    catch(err) {
        const error = {error: err};
        res.send(error);
    }
}