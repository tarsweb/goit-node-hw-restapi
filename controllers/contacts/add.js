// import { addContact } from '../../models/contacts.js'
import { addContact } from '../../models/contacts/index.js'

const add = async (req, res, next) => {
  const contact = await addContact(req.body);
  if (contact)
    return res.status(201).json({ status: "success", data: contact });
  next();
};

export { add }