const { Router } = require('express')

const { users : ctrl} = require('../../controllers')

const { ctrlWrapper } = require('../../helpers')
const { validation, authenticate } = require('../../middlewares')
const { schemas, customMessages } = require('../../models').user

const router = Router();

router.patch(
  "/subscription",
  authenticate,
  validation(schemas.updateSubscriptionSchema, customMessages.userMessage),
  ctrlWrapper(ctrl.subscription)
); 

module.exports = router;