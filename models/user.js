const { Schema, model, default: mongoose } = require("mongoose");
const Joi = require("joi");

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env

const { handleValidationErrors } = require('../helpers')

const subscription = ["starter", "pro", "business"]
const defaultSubscription = subscription[0];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: defaultSubscription,
    },
    avatarURL: {
      type: String,
      required: true
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.getToken = function () {
  const payload = {id: this._id}
  const token =  jwt.sign(payload, SECRET_KEY)
  this.token = token;
  this.save();
  return token;
}

userSchema.post("save", handleValidationErrors)

const userMessage = { messages: {'any.required': "missing fields"} };

const registerSchema = Joi.object({
  email: Joi.string().email({tlds: false}).required(),
  password: Joi.string().required(),
  subscription: Joi.string().valueOf(...subscription).default(defaultSubscription)
}).required()

const loginSchema = Joi.object({
    email: Joi.string().email({tlds: false}).required(),
    password: Joi.string().required(),
}).required()

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscription).required(),
}).required();

const User = model("user", userSchema);

const schemas = {registerSchema, loginSchema, updateSubscriptionSchema}

module.exports = {
    User,
    schemas,
    customMessages : {userMessage},
}