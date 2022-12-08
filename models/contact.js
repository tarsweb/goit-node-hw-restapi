const { Schema, model } = require("mongoose");
const Joi = require('joi');

const { handleValidationErrors } = require('../helpers')

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleValidationErrors)

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

const schemas = { addSchema, updateFavoriteSchema }

const customMessages = {
  post: contactSchemaPostMessage,
  put: contactSchemaPutMessage,
  patch: contactSchemaPatchMessage,
}

module.exports = {
  Contact,
  schemas,
  customMessages,
};