//This middleware will be used to standardize the results returned from validation operations.
const validate = (schema) => (req,res,next) => {
    const {value, error} = schema.validate(req.body)

    if(error){
        const errorMessage = error.details.map(detail => detail.message).join(', ')
        res.status(400).send({error: errorMessage})
        return
    }
    return next()
}

module.exports = validate