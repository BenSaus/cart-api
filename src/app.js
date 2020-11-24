require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const sequelize = require("./database/sequelize")

// API Version
const VERSION = "v1"

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
app.use(`/${VERSION}/carts`, cartRouter)
app.use(`/${VERSION}/carts`, cartItemRouter)

// Setup Sequelize ORM
// TODO: Use logger here instead
console.log(`Connecting to database...`)
const modelPaths = ["../api/cart/models/", "../api/cartItem/models"]
sequelize.connect(modelPaths)
// Ensure tables exist
sequelize.inst.sync()
// TODO: Use logger here instead
console.log("Done")

const port = process.env.PORT || 4000
// TODO: Use logger here instead
app.listen(port, () => console.log(`Listening on port ${port}!`))

// Error Handlers
app.use(errorHandlers.error404)
app.use(errorHandlers.errorResponse)

module.exports = app
