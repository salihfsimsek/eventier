const Joi = require('joi')

const createValidation = Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required(),
})

module.exports = {createValidation}