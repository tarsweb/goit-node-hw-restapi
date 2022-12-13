const { Contact } = require('../../models').contact

const { requestError } = require('../../helpers');

const removeById = async (req, res) =>{
  const { _id: owner } = req.user;
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId).findOne({owner});
  if (!result ) 
    throw requestError(404, "Not found")
  res.json({ message : "contact deleted"})
}

module.exports = removeById