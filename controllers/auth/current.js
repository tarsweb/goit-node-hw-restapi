const current = async (req, res) => {
  const currentUser = req.user;
  res.json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

module.exports = current;