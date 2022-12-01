const { Router } = require('express')

const { contacts : ctrl } = require('../../controllers')

const { validation, ctrlWrapper } = require('../../middlewares')
// const { contactSchema, contactSchemaPostMessage, contactSchemaPutMessage } = require('../../schemas');
const {schemas, customMessages} = require('../../models/contacts')

const router = Router();

router
  .get('/', ctrlWrapper(ctrl.getAll))
  .post('/', validation(schemas.addSchema, customMessages.post), ctrlWrapper(ctrl.add))

  .get('/:contactId', ctrlWrapper(ctrl.getById))
  .put('/:contactId', validation(schemas.addSchema, customMessages.put), ctrlWrapper(ctrl.updateById))
  .patch('/:contactId/favorite', validation(schemas.updateFavoriteSchema, customMessages.patch), ctrlWrapper(ctrl.updateStatusContact))
  .delete('/:contactId', ctrlWrapper(ctrl.removeById))

module.exports = router;