const ApiError = require('../errors/apiError')


const sendErrorResponse = async (error, res) => {
    return res.status(error?.status || 500).send({
        error: {
            message: error?.message || 'Internal Server Error'
        }
    })
 }

const handleDuplicateKeyError = async (err,res) => {
    const field = Object.keys(err.keyValue);
    const status = 409;
    const error = `An account with that ${field} already exists.`;
    sendErrorResponse(new ApiError(error, status),res )
}

const errorHandler = async (error, req, res, next) => {
    if(error.code && error.code === 11000) handleDuplicateKeyError(error, res)
    else sendErrorResponse(new ApiError(error.message, error.status), res)
}



module.exports = errorHandler