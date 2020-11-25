const db = require("../../database/models")
const controller = require("./controllers/cartItem")
const express = require("express")
const router = express.Router()

// Add items endpoint
router.post("/:id/items", async (req, res) => {
    // TODO: Validate id here...
    const cartId = req.params.id

    let resp
    try {
        resp = await controller.addCartItem(
            { db },
            { ...req.body.data, cartId }
        )
    } catch (error) {
        // TODO: Use logger here instead
        console.error(error)
        resp = utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }

    res.status(resp.status)
    res.send(resp.body)
})

// Remove items endpoint
router.delete("/:id/items/:cartItemId", async (req, res) => {
    // TODO: Validate id and item id here...

    let resp
    try {
        resp = await controller.removeCartItem(
            { db },
            { cartItemId: req.params.cartItemId, cartId: req.params.id }
        )
    } catch (error) {
        console.error(error)
        resp = utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }

    res.status(resp.status)
    res.send(resp.body)
})

// Update cart item endpoint
router.put("/:id/items/:cartItemId", async (req, res) => {
    // TODO: Validate id and item id here...
    // Quantity must be 1 or greater
    let resp
    try {
        resp = await controller.updateCartItem(
            { db },
            {
                cartItemId: req.params.cartItemId,
                cartId: req.params.id,
                quantity: req.body.data.quantity,
            }
        )
    } catch (error) {
        // TODO: Use logger here instead
        console.error(error)
        resp = utils.createErrorResp({ message: "Internal Server Error" }, 500)
    }

    res.status(resp.status)
    res.send(resp.body)
})

module.exports = router
