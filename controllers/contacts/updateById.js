const { Contact } = require('../../models/contact')

const { requestError } = require('../../helpers');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
  if (!result) throw requestError(404, "Not found")
  res.json({ status: "success", data: result })
}

module.exports = updateById