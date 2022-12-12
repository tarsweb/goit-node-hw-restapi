const { Router } = require('express')

const { auth : ctrl} = require('../../controllers')

const { ctrlWrapper } = require('../../helpers')
const { validation, authenticate } = require('../../middlewares')
const { schemas, customMessages } = require('../../models/user')

const router = Router();

router
  .post("/signup", validation(schemas.registerSchema, customMessages.userMessage), ctrlWrapper(ctrl.register))
  .post("/register", validation(schemas.registerSchema, customMessages.userMessage), ctrlWrapper(ctrl.register))

  .post("/login", validation(schemas.loginSchema, customMessages.userMessage), ctrlWrapper(ctrl.login))
  
  .get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;