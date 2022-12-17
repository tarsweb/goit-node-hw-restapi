const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, EMAILFROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const email = { ...data, from: EMAILFROM };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;