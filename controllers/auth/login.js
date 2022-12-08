const { User } = require('../../models/user')
const jwt = require("jsonwebtoken");

// const {SECRET_KEY} = process.env;

const { requestError } = require('../../helpers');

const login = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})
  if (!user) throw requestError(401, "Email not found");
  
  if  (!user.isValidPassword(password)) 
    throw requestError(401, "Email or password is wrong");
  const token = user.getToken();
  res.json({
    token,
    user: {email : user.email, subscription : user.subscription}
  })
}

module.exports = login