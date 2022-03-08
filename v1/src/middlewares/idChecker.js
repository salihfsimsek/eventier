const idChecker = (field) => async (req, res, next) => {
    if (!req.params[field || 'id']?.match(/^[0-9a-fA-F]{24}$/)) {
        next({message: 'ID not valid', status: 400})
        return;
    }
    next()
}

module.exports = idChecker