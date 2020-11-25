require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const constants = require("./constants")
const db = require("./database/models")

// Declare routes
const errorHandlers = require("./errorHandlers/errorHandlers")
const cartItemRouter = require("./api/cartItem/cartItem.routes.js")
const cartRouter = require("./api/cart/cart.routes.js")

// Setup express
const app = express()

// Setup logging
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

// Setup parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Setup routes
app.use(`/${constants.VERSION}/carts`, cartRouter)
app.use(`/${constants.VERSION}/carts`, cartItemRouter)

// Error Handlers
app.use(errorHandlers.error404)
app.use(errorHandlers.errorResponse)

module.exports = app
