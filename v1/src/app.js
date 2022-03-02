const express = require('express');
const config = require('./configs/index')

//Start configuration
config()

const app = express()

module.exports = app
