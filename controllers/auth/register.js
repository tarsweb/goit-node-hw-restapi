const { User } = require('../../models').user
const gravatar = require("gravatar");
const { v4 : uuidv4 } = require("uuid")

const { requestError, sendMail } = require('../../helpers');

const register = async (req, res) => {
  const {email, password, subscription} = req.body;
  const user = await User.findOne({email})
  if (user) 
    throw requestError(409, "Email in use")

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  console.log(verificationToken);
  const newUser = new User({email, subscription, avatarURL, verificationToken});
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Verify register on",
    html: `<a href="http://localhost:3000/api/auth/verify/${newUser.verificationToken}" target="_blank">Click to confign email</a>`,
  };
  console.log(mail);
  // sendMail(mail)
  res.status(201).json({
    user: {email : newUser.email, subscription : newUser.subscription}
  })
};

module.exports = register;