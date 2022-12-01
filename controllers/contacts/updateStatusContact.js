const { Contact } = require('../../models/contacts')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
  if (result) return res.json({ status: "success", data: result });
  next()
}

module.exports = updateStatusContact