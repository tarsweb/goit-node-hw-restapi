const { requestError } = require("../../helpers");

const current = async (req, res) => {
  const currentUser = req.user;
  if (!currentUser) 
    requestError(401, "Not authorized");
  
  res.json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

module.exports = current;
