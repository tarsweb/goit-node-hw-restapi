// const { getContactById } =require('../../models/contacts');

// const getById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await getContactById(contactId);
//   if (contact) return res.json({ status: "success", data: contact });
//   next();
// };

const { Contact } = require('../../models/contacts')

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) return res.json({ status: "success", data: contact });
  next()
}

module.exports = getById