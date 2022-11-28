// import { getContactById } from '../../models/contacts.js'
import { getContactById } from '../../models/contacts/index.js'

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) return res.json(contact)
  next()
}

export {getById}