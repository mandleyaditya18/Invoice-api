const Invoice = require('./models/invoice');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
})

module.exports.checkDues = async (req, res) => {
    try {
        const currentDate = new Date();
        const invoices = await Invoice.find({dueDate: {$lte: currentDate}});

        invoices.forEach((invoice) => {
            const mailOptions = {
                from: process.env.EMAIL_ID,
                to: `${invoice.email}`,
                subject: 'Due Date Expired',
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
        });
    }
    catch (err) {
        const error = {error: err};
        res.send(error);
    }
}