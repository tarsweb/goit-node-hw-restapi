const { Router} = require('express')

const { contacts : ctrl } = require('../../controllers')

const { validation, ctrlWrapper } = require('../../middelwares')
const { contactSchema, contactSchemaPostMessage, contactSchemaPutMessage } = require('../../schemas');

const router = Router();

router
.get('/', ctrlWrapper(ctrl.getAll))
.post('/', validation(contactSchema, contactSchemaPostMessage), ctrlWrapper(ctrl.add))

router
.get('/:contactId', ctrlWrapper(ctrl.getById))
.put('/:contactId', ctrlWrapper(ctrl.updateById))
.delete('/:contactId', ctrlWrapper(ctrl.removeById))

module.exports = router;