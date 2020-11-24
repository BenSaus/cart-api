const sequelize = require("../../database/sequelize")
const controller = require("./controllers/cart")
const express = require("express")
const utils = require("../../utils/response")
const router = express.Router()

// Create new cart
router.post("/", async (req, res) => {
    let resp
    try {
        resp = await controller.createCart({ db: sequelize.inst })
    } catch (error) {
        // TODO: Use logger here instead
        console.error(error)
        resp = utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }
    res.status(resp.status)
    res.send(resp.body)
})

// Get existing cart
router.get("/:id", async (req, res) => {
    // TODO: Validate cart id here...
    let resp
    try {
        resp = await controller.getCart({ db: sequelize.inst }, req.params.id)
    } catch (error) {
        // TODO: Use logger here instead
        console.error(error)
        resp = utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }

    res.status(resp.status)
    res.send(resp.body)
})

module.exports = router
