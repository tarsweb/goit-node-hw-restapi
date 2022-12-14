const { Router } = require('express')

const { users : ctrl} = require('../../controllers')

const { ctrlWrapper } = require('../../helpers')
const { validation, authenticate, upload } = require('../../middlewares')
const { schemas, customMessages } = require('../../models').user

const router = Router();

router
  .get("/current", authenticate, ctrlWrapper(ctrl.current))
  .patch(
    "/subscription",
    authenticate,
    validation(schemas.updateSubscriptionSchema, customMessages.userMessage),
    ctrlWrapper(ctrl.subscription)
  )
  .patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar)) 

module.exports = router;