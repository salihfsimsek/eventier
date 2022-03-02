const express = require('express');
const config = require('./configs/index')
const loaders = require('./loaders/index')
const helmet = require('helmet')

//Error handle middleware
const errorHandler = require('./middlewares/errorHandler')

//Start configuration
config()

//Running important parts of app on start application 
loaders()

const app = express()

app.use(express.json())
app.use(helmet())


//Error handling
app.use(errorHandler)

module.exports = app
