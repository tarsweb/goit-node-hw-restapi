import Joi from "joi";

const contactSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email({tlds: false}).required(),
    phone: Joi.string().length(14).required()
})

export { contactSchema }