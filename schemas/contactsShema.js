import Joi from "joi";


const contactSchemaPostMessage = { messages: {'any.required': "missing required field"} };
const contactSchemaPutMessage = { messages: {'any.required': "missing fields"} };

const contactSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email({tlds: false}).required(),
    phone: Joi.string().length(14).required()
}).required();

export { contactSchema, contactSchemaPostMessage, contactSchemaPutMessage }