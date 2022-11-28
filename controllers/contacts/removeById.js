// import { removeContact } from '../../models/contacts.js'
import { removeContact } from '../../models/contacts/index.js'

const removeById =  async (req, res, next) => {
  const { contactId } = req.params
  if (await removeContact(contactId)) return res.json({ message : "contact deleted"})
  next()
}

export { removeById }