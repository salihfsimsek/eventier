const express = require('express');
const config = require('./configs/index')

const helmet = require('helmet')

//Error handle middleware
const errorHandler = require('./middlewares/errorHandler')

//Start configuration
config()

const app = express()

app.use(express.json())
app.use(helmet())


//Error handling
app.use(errorHandler)

module.exports = app
