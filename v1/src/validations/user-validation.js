const Joi = require('joi')

const createValidation = Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required(),
})

const loginValidation = Joi.object({
    email: Joi.string().email(),
    username: Joi.string().alphanum(),
    password: Joi.string().required()
}).xor('email', 'username')

const changePasswordValidation = Joi.object({
    password: Joi.string().required().min(8),
    c_password: Joi.string().valid(Joi.ref('password')).required()
})

module.exports = {createValidation, loginValidation, changePasswordValidation}