const nodemailer = require('nodemailer');
const config = require('../configs/email.config');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.HOST,
            port: config.PORT,
            secure: false,
            auth: {
                user: config.USER,
                pass: config.PASSWORD
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: config.USER,
            to,
            subject: 'Активация к тестированию ' + config.API,
            text: '',
            html: 
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${config.API + "/v1/api/auth/activate/" + link}">
                            ${link}
                        </a>
                    </div>
                `
        });
    }
}

module.exports = new MailService();