const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_USER, META_PASSWORD} = process.env;

const nodemalierConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: META_USER,
        pass: META_PASSWORD,
    }
};

const transporter = nodemailer.createTransport(nodemalierConfig);

const sendEmail = async(data) => {
    try {
        const email = {...data, from: META_USER};
        await transporter.sendMail(email);
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;