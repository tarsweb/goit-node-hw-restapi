const {isValidObjectId} = require('mongoose');
const { requestError } = require('../helpers');

const isValidId = (req, _, next) => {
    const { contactId } = req.params;
    const isCorrectId = isValidObjectId(contactId);
    if (!isCorrectId) {
      const error = requestError(400, `${contactId} is not corrent id format`);
      next(error);
    }
    next()
}

module.exports = isValidId