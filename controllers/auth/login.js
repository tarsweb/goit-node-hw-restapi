const { User } = require('../../models/user')

const { requestError } = require('../../helpers');

const login = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})
  if (!user) throw requestError(401, "Email not found");
  
  if  (!user.isValidPassword(password)) throw requestError(401, "Password wrong");
  const token = "there can be a token";
  res.json({
    token,
  })
}

module.exports = login