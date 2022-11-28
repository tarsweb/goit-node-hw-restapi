import { Router } from 'express'

import { contacts as  ctrl } from '../../controllers/index.js'

import { validation, ctrlWrapper } from '../../middelwares/index.js'
import { contactSchema, contactSchemaPostMessage, contactSchemaPutMessage } from '../../schemas/index.js'

const router = Router()

router
.get('/', ctrlWrapper(ctrl.getAll))
.post('/', validation(contactSchema, contactSchemaPostMessage), ctrlWrapper(ctrl.add))

router
.get('/:contactId', ctrlWrapper(ctrl.getById))
.put('/:contactId', validation(contactSchema, contactSchemaPutMessage), ctrlWrapper(ctrl.updateById))
.delete('/:contactId', ctrlWrapper(ctrl.removeById))

export default router