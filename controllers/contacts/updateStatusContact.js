const { requestError } = require('../../helpers');
const { Contact } = require("../../models").contact;

const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true}).findOne({owner})
  if (!result) 
    throw requestError(404, "Not found")
  res.json({ status: "success", data: result });
  next()
}

module.exports = updateStatusContact