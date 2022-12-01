// const { listContacts } = require("../../models/contacts")

// const getAll = async (req, res, next) => {
//     const contacts = await listContacts()
//     res.json({status : "success", data: contacts})
// }
const { Contact } = require('../../models/contacts')

const getAll = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json({status : "success", data: result})
}

module.exports = getAll