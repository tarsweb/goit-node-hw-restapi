const { Contact } = require('../../models/contact')

const getAll = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json({status : "success", data: result})
}

module.exports = getAll