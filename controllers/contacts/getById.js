const { Contact } = require("../../models").contact;

const { requestError } = require('../../helpers');

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).findOne({owner});
  if (!result) 
    throw requestError(404, "Not found")
  res.json({ status: "success", data: result });
}

module.exports = getById