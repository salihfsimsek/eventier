const express = require('express');
const config = require('./config/index')

//Start configuration
config()

const app = express()

module.exports = app
