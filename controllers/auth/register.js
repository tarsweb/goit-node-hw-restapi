const { User } = require('../../models').user

const { requestError } = require('../../helpers');

const register = async (req, res) => {
  const {email, password, subscription} = req.body;
  const user = await User.findOne({email})
  if (user) 
    throw requestError(409, "Email in use")
//   if (User.userExsist) throw requestError(409, "Email in use")

  const newUser = new User({email, subscription});
  newUser.setPassword(password);
 await newUser.save();

  res.status(201).json({
    user: {email : newUser.email, subscription : newUser.subscription}
  })
};

module.exports = register;