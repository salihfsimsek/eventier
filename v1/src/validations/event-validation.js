const Joi = require('joi')

const createValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    location: Joi.string().required()
})

const updateValidation = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
    location: Joi.string()
})

module.exports = {createValidation, updateValidation}