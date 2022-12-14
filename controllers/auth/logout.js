const { User } = require('../../models').user

const logout = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};

module.exports = logout;
