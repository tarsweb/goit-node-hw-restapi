const validation = (schema, options = {}) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {...schema.options, ...options});
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
