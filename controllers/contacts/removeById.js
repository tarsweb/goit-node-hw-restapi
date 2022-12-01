// const { removeContact } =require('../../models/contacts');

// const removeById =  async (req, res, next) => {
//   const { contactId } = req.params
//   if (await removeContact(contactId)) return res.json({ message : "contact deleted"})
//   next()
// }

const { Contact } = require('../../models/contacts')

const removeById = async (req, res, next) =>{
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId);
  if (result) return res.json({ message : "contact deleted"})
  next()
}

module.exports = removeById