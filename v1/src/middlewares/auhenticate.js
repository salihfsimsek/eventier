const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization')

    let token = authHeader && authHeader.split(' ')[1]

    if(token === null) return next({message: 'You have no permission to do this', status: 401})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if(err) return next({message: 'Invalid token', status: 401})
        req.user = user
        next()
    })
}

module.exports = authenticateToken