const express = require('express');
const config = require('./configs/index')
const loaders = require('./loaders/index')
const helmet = require('helmet')

//Routes
const {userRoutes} = require('./routes/index')

//Error handle middleware
const errorHandler = require('./middlewares/errorHandler')

//Start configuration
config()

//Running important parts of app on start application 
loaders()

const app = express()

app.use(express.json())
app.use(helmet())

app.use('/api/users',userRoutes)

//Error handling
app.use(errorHandler)

module.exports = app
