import { Router } from 'express'

import { listContacts, getContactById, addContact, removeContact, updateContact }   from '../../models/contacts.js'

const router = Router()

router.get('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  res.json(await listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const { contactId } = req.params
  const contact = await getContactById(contactId);
  if (contact) return res.json(contact)
  next()
})

router.post('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const contact = await addContact(req.body);
  if (contact) return res.status(201).json(contact)
  next()
})

router.delete('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const { contactId } = req.params
  if (await removeContact(contactId)) return res.status(200).json({ message : "contact deleted"})
  next()
})

router.put('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const { contactId } = req.params
  console.log(req.body);
  if (! Object.keys(req.body).length) return res.status(400).json({message : "missing fields"})
  const contact = await updateContact(contactId, req.body)
  if (contact) return res.status(200).json(contact)
  next()
})

export default router
