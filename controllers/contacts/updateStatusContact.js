const { requestError } = require('../../helpers');
const { Contact } = require('../../models/contact')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
  if (!result) throw requestError(404, "Not found")
  res.json({ status: "success", data: result });
  next()
}

module.exports = updateStatusContact