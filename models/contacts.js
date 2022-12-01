const { Schema, model } = require("mongoose");
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactSchemaPostMessage = { messages: {'any.required': "missing required field"} };
const contactSchemaPutMessage = { messages: {'any.required': "missing fields"} };
const contactSchemaPatchMessage = { messages: {'any.required': "missing field favorite"} };


const addSchema  = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email({tlds: false}).required(),
    phone: Joi.string().length(14).required(),
    favorite: Joi.boolean().default(false),
}).required();

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
}).required()

const Contact = model("contact", contactSchema)

module.exports = {
  Contact,
  schemas: { addSchema, updateFavoriteSchema },
  customMessages: {
    post: contactSchemaPostMessage,
    put: contactSchemaPutMessage,
    patch: contactSchemaPatchMessage,
  },
};