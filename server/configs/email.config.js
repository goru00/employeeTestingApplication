const nodemailer = require('nodemailer');
module.exports = nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.log('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }
    return nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
});
