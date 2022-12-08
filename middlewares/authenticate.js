const { User } = require('../models/user')

const jwt = require("jsonwebtoken");

const { requestError } = require('../helpers');

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") 
    next(requestError(401, "Not authorized"));
  
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = User.findOne({ token });
    if (!user) {
    next(requestError(401, "Not authorized"));
    }
    req.user = user;
    //   console.log(User);
    //   const user = await User.verifyToken(token)
    //   console.log(user);
    next();
  } catch (error) {
    next(requestError(401, error.message));
  }
};

module.exports = authenticate