const express = require('express');
const path = require('path');
const config = require('./configs/index')
const loaders = require('./loaders/index')
const helmet = require('helmet')
const events = require('./scripts/events')

//Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocumentation = require('./swagger/swagger')

//Routes
const {userRoutes, eventRoutes} = require('./routes/index')

//Error handle middleware
const errorHandler = require('./middlewares/errorHandler')

//Start configuration
config()

//Running important parts of app on start application 
loaders()

events()

const app = express()

app.use(express.json())
app.use(helmet())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))
app.use('/uploads/', express.static(path.join(__dirname, './uploads')))

/**
 * @swagger
 * /users:
 *      post:
 *          description: 'List of usersssss',
 */
app.use('/api/users',userRoutes)
app.use('/api/events', eventRoutes)
//Error handling
app.use(errorHandler)

module.exports = app
