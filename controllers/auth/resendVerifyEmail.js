const { User } = require("../../models").user;

const { requestError, sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({email});
  if (!user) throw requestError(404, "User not found");
  if (user.verify)
    throw requestError(400, "Verification has already been passed");

  const mail = {
    to: email,
    subject: "Verify register on",
    html: `<a href="${req.protocol}://${req.headers.host}${req.baseUrl}/verify/${user.verificationToken}" target="_blank">Click to confign email</a>`,
  };
  // console.log(mail);
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
