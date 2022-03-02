const errorHandler = async (error, req, res, next) => {
    res.status(error.status || 500)({
        error: {
            message: error.message || 'Internal Server Error'
        }
    })
}

module.exports = errorHandler