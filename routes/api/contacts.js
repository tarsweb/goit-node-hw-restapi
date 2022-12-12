const { Router } = require('express')

const { contacts : ctrl } = require('../../controllers')

const { ctrlWrapper } = require('../../helpers')
const { validation, isValidId, authenticate } = require('../../middlewares')
const {schemas, customMessages} = require('../../models/contact')

const router = Router();

router
  .get('/', authenticate, ctrlWrapper(ctrl.getAll))
  .post('/', authenticate, validation(schemas.addSchema, customMessages.post), ctrlWrapper(ctrl.add))

  .get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById))
  .put('/:contactId', authenticate, isValidId, validation(schemas.addSchema, customMessages.put), ctrlWrapper(ctrl.updateById))
  .patch('/:contactId/favorite', authenticate, isValidId, validation(schemas.updateFavoriteSchema, customMessages.patch), ctrlWrapper(ctrl.updateStatusContact))
  .delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeById))

module.exports = router;