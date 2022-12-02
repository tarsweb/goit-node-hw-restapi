const { Contact } = require('../../models/contact')

const add = async (req, res, next) => {
  const result = await Contact.create(req.body)
  return res.status(201).json({ status: "success", data: result });
}

module.exports = add