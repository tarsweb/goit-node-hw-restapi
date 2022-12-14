const { User } = require('../../models').user
const gravatar = require("gravatar");

const { requestError } = require('../../helpers');

const register = async (req, res) => {
  const {email, password, subscription} = req.body;
  const user = await User.findOne({email})
  if (user) 
    throw requestError(409, "Email in use")

  const avatarURL = gravatar.url(email);
  const newUser = new User({email, subscription, avatarURL});
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    user: {email : newUser.email, subscription : newUser.subscription}
  })
};

module.exports = register;