
const { addContact } = require('../../models/contacts')

const add = async (req, res, next) => {
  const contact = await addContact(req.body);
  if (contact)
    return res.status(201).json({ status: "success", data: contact });
  next();
};

module.exports = add