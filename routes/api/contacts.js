import { Router } from 'express'

import { listContacts, getContactById, addContact, removeContact, updateContact }   from '../../models/contacts.js'

const router = Router()

router
.get('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  res.json(await listContacts())
})
.post('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const contact = await addContact(req.body);
  if (contact) return res.status(201).json(contact)
  next()
})

router
.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const { contactId } = req.params
  const contact = await getContactById(contactId);
  if (contact) return res.json(contact)
  next()
})
.delete('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const { contactId } = req.params
  if (await removeContact(contactId)) return res.json({ message : "contact deleted"})
  next()
})
.put('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const { contactId } = req.params
  if (! Object.keys(req.body).length) return res.status(400).json({message : "missing fields"})
  const contact = await updateContact(contactId, req.body)
  if (contact) return res.json(contact)
  next()
})

export default router