const { Contact } = require('../../models/contact')

const { requestError } = require('../../helpers');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) throw requestError(404, "Not found")
  res.json({ status: "success", data: result });
}

module.exports = getById